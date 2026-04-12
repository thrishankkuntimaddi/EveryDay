/**
 * login.js — Auth overlay (Sign In / Create Account / Verify Email)
 * ===================================================================
 * Three modes:
 *   'signin'       — existing user logs in
 *   'signup'       — new user creates account (triggers verification email)
 *   'verify-email' — email sent, waiting for user to verify
 */

import { login, signup, logout, resendVerificationEmail } from '../lib/auth.js';
import { auth } from '../lib/auth.js';
import { patchUserData } from '../lib/db.js';

let _overlay = null;
let _currentMode = 'signin';

// ── Mount / unmount ───────────────────────────────────────────────────────────

export function mountLoginScreen() {
  if (_overlay) return;

  _overlay = document.createElement('div');
  _overlay.id = 'auth-screen';
  _overlay.innerHTML = _buildHTML('signin');
  document.body.appendChild(_overlay);

  _bindEvents();
}

export function unmountLoginScreen() {
  if (_overlay) {
    _overlay.remove();
    _overlay = null;
  }
}

export function showVerifyEmailScreen() {
  if (!_overlay) mountLoginScreen();
  _switchMode('verify-email');
}

// ── HTML builders ─────────────────────────────────────────────────────────────

function _buildHTML(mode) {
  return `
    <div class="auth-card" role="dialog" aria-modal="true" aria-label="Sign in to EveryDay">
      <div class="auth-brand">
        <div class="auth-brand-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
        </div>
        <span class="auth-brand-name">EveryDay</span>
      </div>

      ${_buildContent(mode)}
    </div>
  `;
}

function _buildContent(mode) {
  if (mode === 'verify-email') {
    const email = auth.currentUser?.email || 'your email';
    return `
      <div class="auth-verify-state" id="auth-mode-content">
        <div class="auth-verify-icon">📬</div>
        <h2 class="auth-title">Check your inbox</h2>
        <p class="auth-subtitle">
          We sent a verification link to<br>
          <strong>${email}</strong>
        </p>
        <p class="auth-verify-hint">Click the link in the email, then come back and press Continue.</p>

        <button class="auth-btn auth-btn--primary" id="auth-verified-btn">
          ✓ I've verified — Continue
        </button>

        <div class="auth-divider"><span>or</span></div>

        <button class="auth-btn auth-btn-ghost" id="auth-resend-btn">
          Resend verification email
        </button>
        <button class="auth-btn auth-btn-ghost auth-btn-sm" id="auth-back-signin-btn">
          ← Back to Sign In
        </button>

        <p class="auth-error" id="auth-error" hidden></p>
      </div>
    `;
  }

  const isSignup = mode === 'signup';
  return `
    <div id="auth-mode-content">
      <h2 class="auth-title">${isSignup ? 'Create account' : 'Welcome back'}</h2>
      <p class="auth-subtitle">${isSignup ? 'Start your discipline journey.' : 'Sign in to continue.'}</p>

      <form class="auth-form" id="auth-form" novalidate>
        <div class="auth-field">
          <label class="auth-label" for="auth-email">Email</label>
          <input class="auth-input" id="auth-email" type="email"
                 placeholder="you@example.com" autocomplete="email" required />
        </div>

        <div class="auth-field">
          <label class="auth-label" for="auth-password">Password</label>
          <input class="auth-input" id="auth-password" type="password"
                 placeholder="${isSignup ? 'Create a password (min. 6 chars)' : 'Your password'}"
                 autocomplete="${isSignup ? 'new-password' : 'current-password'}" required />
        </div>

        <p class="auth-error" id="auth-error" hidden></p>

        <button class="auth-btn auth-btn--primary" id="auth-submit-btn" type="submit">
          ${isSignup ? 'Create Account' : 'Sign In'}
        </button>
      </form>

      <div class="auth-mode-switch">
        ${isSignup
          ? `<span class="auth-mode-switch-text">Already have an account?</span> <button class="auth-mode-switch-btn" id="auth-mode-toggle">Sign In</button>`
          : `<span class="auth-mode-switch-text">No account?</span> <button class="auth-mode-switch-btn" id="auth-mode-toggle">Create one</button>`
        }
      </div>
    </div>
  `;
}

// ── Mode switching ────────────────────────────────────────────────────────────

function _switchMode(mode) {
  _currentMode = mode;
  const card = _overlay?.querySelector('.auth-card');
  if (!card) return;

  const content = card.querySelector('#auth-mode-content');
  if (content) content.remove();

  card.insertAdjacentHTML('beforeend', _buildContent(mode));
  _bindEvents();
}

// ── Event binding ─────────────────────────────────────────────────────────────

function _bindEvents() {
  if (!_overlay) return;

  // Mode toggle (signin ↔ signup)
  _overlay.querySelector('#auth-mode-toggle')?.addEventListener('click', () => {
    _switchMode(_currentMode === 'signin' ? 'signup' : 'signin');
  });

  // Main form submit
  _overlay.querySelector('#auth-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email    = _overlay.querySelector('#auth-email')?.value.trim();
    const password = _overlay.querySelector('#auth-password')?.value;
    if (!email || !password) return;

    _setLoading(true);
    _clearError();

    try {
      if (_currentMode === 'signup') {
        await signup(email, password); // also sends verification email
        _switchMode('verify-email');   // show verify screen, don't boot app yet
      } else {
        await login(email, password);
        // onAuthStateChanged in main.js takes over from here
      }
    } catch (err) {
      _showError(_friendlyError(err.code));
    } finally {
      _setLoading(false);
    }
  });

  // "I've verified — Continue"
  // Reload the Firebase user to get the freshest emailVerified status,
  // then only proceed if Firebase confirms the email was clicked.
  _overlay.querySelector('#auth-verified-btn')?.addEventListener('click', async () => {
    _setLoading(true);
    _clearError();
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Session expired. Please sign in again.');

      // Force-refresh Firebase user state from the server
      await user.reload();

      if (auth.currentUser?.emailVerified) {
        // Stamp Firestore so the auth gate's getCached('emailVerified') also passes
        try {
          await patchUserData({ emailVerified: true, verificationToken: null, tokenCreatedAt: null });
        } catch (_) { /* non-fatal — user.emailVerified is the ground truth */ }
        window.location.reload();
      } else {
        _showError('Email not verified yet. Please click the link in your inbox (check spam too).');
        _setLoading(false);
      }
    } catch (err) {
      _showError(err.message || 'Something went wrong. Please try again.');
      _setLoading(false);
    }
  });

  // Resend verification email (Firebase built-in — no backend needed)
  _overlay.querySelector('#auth-resend-btn')?.addEventListener('click', async () => {
    _clearError();
    try {
      await resendVerificationEmail();
      _showError('✅ Verification email sent! Check your inbox (and spam folder).');
    } catch (err) {
      _showError('Failed to resend: ' + (err.message || 'Unknown error'));
    }
  });

  // Back to sign in (from verify screen)
  _overlay.querySelector('#auth-back-signin-btn')?.addEventListener('click', async () => {
    await logout();
    _switchMode('signin');
  });
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function _setLoading(on) {
  const btn = _overlay?.querySelector('#auth-submit-btn, #auth-verified-btn');
  if (!btn) return;
  btn.disabled = on;
  btn.textContent = on ? 'Please wait…' : _currentMode === 'signup'
    ? 'Create Account'
    : _currentMode === 'verify-email'
    ? '✓ I\'ve verified — Continue'
    : 'Sign In';
}

function _showError(msg) {
  const el = _overlay?.querySelector('#auth-error');
  if (!el) return;
  el.textContent = msg;
  el.hidden = false;
}

function _clearError() {
  const el = _overlay?.querySelector('#auth-error');
  if (el) el.hidden = true;
}

function _friendlyError(code) {
  const map = {
    'auth/user-not-found':       'No account found with this email.',
    'auth/wrong-password':       'Incorrect password. Please try again.',
    'auth/invalid-credential':   'Incorrect email or password.',
    'auth/email-already-in-use': 'An account with this email already exists.',
    'auth/weak-password':        'Password must be at least 6 characters.',
    'auth/invalid-email':        'Please enter a valid email address.',
    'auth/too-many-requests':    'Too many attempts. Please try again later.',
  };
  return map[code] || 'Something went wrong. Please try again.';
}
