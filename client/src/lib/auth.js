/**
 * auth.js — Firebase Authentication + Email Verification
 * ========================================================
 *
 * VERIFICATION FLOW:
 *   1. signup()  → creates Firebase user
 *                → calls sendEmailVerification() — Firebase sends the link
 *
 *   2. User clicks Firebase verification link (no backend needed)
 *
 *   3. "I've verified — Continue" button → auth.currentUser.reload()
 *                → if user.emailVerified: write Firestore emailVerified=true → boot app
 *
 *   Note: thrishankkuntimaddi.github.io must be in Firebase Console > Authentication
 *         > Settings > Authorized domains for verification links to work.
 */

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
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

// ── Signup with Firebase email verification ───────────────────────────────────

/**
 * signup — Create a new Firebase account, then send a verification email
 * using Firebase's built-in sendEmailVerification() — no backend required.
 */
export const signup = async (email, password) => {
  // 1. Create Firebase user
  const cred = await createUserWithEmailAndPassword(auth, email, password);

  // 2. Initialize the user's Firestore profile (emailVerified starts false)
  try {
    await setDoc(
      doc(db, 'users', cred.user.uid, 'data', 'profile'),
      { emailVerified: false },
      { merge: true }
    );
  } catch (err) {
    console.warn('[Auth] Could not init Firestore profile:', err.message);
  }

  // 3. Send Firebase's built-in verification email (works on GitHub Pages)
  await sendEmailVerification(cred.user);
  console.log(`[Auth] ✉️  Firebase verification email sent to ${email}`);

  return cred;
};

/**
 * resendVerificationEmail — re-send Firebase's verification email.
 */
export const resendVerificationEmail = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error('No user signed in.');
  await sendEmailVerification(user);
  console.log(`[Auth] ✉️  Verification email resent to ${user.email}`);
};

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
