/**
 * auth.js — Firebase Authentication + Custom Brevo Email Verification
 * =====================================================================
 *
 * VERIFICATION FLOW:
 *   1. signup()  → creates Firebase user → generates UUID token
 *                → writes token to Firestore → calls server /api/auth/send-verification
 *                → server sends branded email via Brevo SMTP
 *
 *   2. User clicks link in email → app URL gets ?verify=TOKEN&uid=UID
 *
 *   3. main.js._handleVerifyToken() → checks token against Firestore
 *                → if valid: sets Firestore emailVerified=true, removes token
 *
 *   4. Auth gate in main.js checks getCached('emailVerified') — lets user in.
 *
 * Firebase's native user.emailVerified is also accepted (belt + suspenders).
 */

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { app } from './firebase.js';
import { db } from './firebase.js';

/** Shared auth instance */
export const auth = getAuth(app);

/** Subscribe to auth state changes. */
export const listenToAuth = (callback) => onAuthStateChanged(auth, callback);

/** Sign in with email + password. */
export const login = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

// ── Signup with custom Brevo verification ────────────────────────────────────

/**
 * signup — Create a new Firebase account, then send a verification email
 * via our Brevo SMTP server endpoint (instead of Firebase's built-in email).
 *
 * Steps:
 *   1. Create Firebase user
 *   2. Generate a UUID verification token
 *   3. Write token to Firestore (users/{uid}/data/profile) immediately
 *   4. POST to /api/auth/send-verification → server sends Brevo email
 */
export const signup = async (email, password) => {
  // 1. Create Firebase user
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  const { uid } = cred.user;

  // 2. Generate UUID token using Web Crypto API (no extra deps)
  const token = crypto.randomUUID();
  const tokenCreatedAt = new Date().toISOString();

  // 3. Write token to Firestore BEFORE calling server
  //    (main.js validation compares against this stored token)
  try {
    await setDoc(
      doc(db, 'users', uid, 'data', 'profile'),
      { emailVerified: false, verificationToken: token, tokenCreatedAt },
      { merge: true }
    );
  } catch (err) {
    console.warn('[Auth] Could not write token to Firestore:', err.message);
    // Continue anyway — email will be sent; token validation may fail gracefully
  }

  // 4. Ask server to send the Brevo verification email
  await _sendVerificationViaServer(email, uid, token);

  return cred;
};

/**
 * resendVerificationEmail — generate a new token, overwrite Firestore, resend.
 * Replaces the old Firebase sendEmailVerification-based resend.
 */
export const resendVerificationEmail = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error('No user signed in.');

  const token = crypto.randomUUID();
  const tokenCreatedAt = new Date().toISOString();

  // Overwrite token in Firestore
  try {
    await setDoc(
      doc(db, 'users', user.uid, 'data', 'profile'),
      { verificationToken: token, tokenCreatedAt },
      { merge: true }
    );
  } catch (err) {
    console.warn('[Auth] Could not refresh token in Firestore:', err.message);
  }

  await _sendVerificationViaServer(user.email, user.uid, token);
};

// ── Internal helpers ──────────────────────────────────────────────────────────

async function _sendVerificationViaServer(email, uid, token) {
  try {
    const res = await fetch('/api/auth/send-verification', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ email, uid, token }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || `Server error ${res.status}`);
    }

    console.log(`[Auth] ✉️  Verification email dispatched via Brevo for ${email}`);
  } catch (err) {
    // In dev the Express server may not be running — log but don't block signup.
    // In production the server is always up, so this will surface properly.
    if (err.message.includes('Failed to fetch') || err.message.includes('ECONNREFUSED') || err.name === 'TypeError') {
      console.warn(
        '[Auth] ⚠️  Could not reach verification server — is `npm run dev:server` running?\n',
        'Signup succeeded. Email was NOT sent. Start the server and resend manually.'
      );
      return; // allow signup to complete without blocking the user
    }
    throw err; // re-throw real server errors (4xx, 5xx)
  }
}

// ── Standard auth actions ─────────────────────────────────────────────────────

/** Sign the current user out. */
export const logout = () => signOut(auth);

/**
 * Re-authenticate the current user with their current password.
 * Required before changePassword or deleteCurrentUser.
 */
export const reauthenticate = async (currentPassword) => {
  const user = auth.currentUser;
  if (!user || !user.email) throw new Error('No user is currently signed in.');
  const cred = EmailAuthProvider.credential(user.email, currentPassword);
  await reauthenticateWithCredential(user, cred);
};

/** Change the current user's password. Requires re-authentication first. */
export const changePassword = async (currentPassword, newPassword) => {
  await reauthenticate(currentPassword);
  await updatePassword(auth.currentUser, newPassword);
};

/** Permanently delete the current user's Firebase Auth account. */
export const deleteCurrentUser = async (currentPassword) => {
  await reauthenticate(currentPassword);
  await deleteUser(auth.currentUser);
};
