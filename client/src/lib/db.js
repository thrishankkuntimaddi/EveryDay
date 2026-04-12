/**
 * db.js — Firestore Data Layer
 * =============================
 * Manages all cloud data for the EveryDay app.
 *
 * ARCHITECTURE:
 *   - One document per user: users/{uid}/data/profile
 *   - In-memory cache (_cache) is the read source — fast, synchronous
 *   - loadUserData()    → hydrate cache from Firestore on boot
 *   - getCached()       → synchronous read from cache (used by api.js)
 *   - patchUserData()   → write partial update to cache + Firestore
 *   - listenToUserData()→ real-time cross-device sync via onSnapshot
 *   - stopListening()   → cleanup on logout
 *
 * KEY DESIGN:
 *   hasPendingWrites check in onSnapshot ensures we ONLY re-render for
 *   changes coming from OTHER devices, not echoing our own local writes.
 */

import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase.js';

// ── Default blank state ───────────────────────────────────────────────────────

const DEFAULT_DATA = {
  tasks:             {},
  streak:            { count: 0, lastDate: null, longest: 0 },
  history:           [],
  settings:          { name: '', goal: '', reminders: {} },
  phase:             'stabilization',
  lastDate:          null,
  customPlan:        null,   // user-edited block plan (array | null)
  taskDescs:         {},     // { [taskId]: string } — task description notes
  immediateTasks:    [],     // Immediate view tasks
  eodLocked:         null,   // YYYY-MM-DD key of day EOD was submitted
  planTomorrow:      null,   // { blocks: [...], savedAt: ISO } | null
  lastUpdated:       null,   // ISO timestamp — stamped on every write for conflict resolution
  // ── Custom email verification (Brevo flow) ──────────────────────────────
  emailVerified:     false,  // true after user clicks verification link in email
  verificationToken: null,   // UUID set on signup; cleared after successful verify
  tokenCreatedAt:    null,   // ISO timestamp — tokens expire after 24 h
};

// ── Module-level singletons ───────────────────────────────────────────────────

let _uid         = null;
let _cache       = null;   // in-memory mirror of the Firestore document
let _unsubscribe = null;   // active onSnapshot unsubscribe fn

// ── Internal helpers ──────────────────────────────────────────────────────────

function _userDoc(uid) {
  return doc(db, 'users', uid, 'data', 'profile');
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * loadUserData — fetch the user's Firestore document and hydrate the cache.
 * MUST be called before getCached() or patchUserData().
 * @returns {Promise<object>} the full cached data object
 */
export async function loadUserData(uid) {
  _uid = uid;
  try {
    const snap = await getDoc(_userDoc(uid));
    _cache = snap.exists()
      ? { ...DEFAULT_DATA, ...snap.data() }
      : { ...DEFAULT_DATA };
  } catch (err) {
    console.warn('[EveryDay DB] Firestore load failed — using defaults:', err.message);
    _cache = { ...DEFAULT_DATA };
  }
  return _cache;
}

/**
 * getCached — synchronous read from the in-memory cache.
 * (Equivalent to the old lsGet used in api.js)
 * @param {string} key
 * @param {*} fallback
 */
export function getCached(key, fallback = null) {
  if (_cache === null) return fallback;
  const val = _cache[key];
  return (val !== undefined && val !== null) ? val : fallback;
}

/**
 * patchUserData — write a partial update to cache + Firestore.
 * Performs a deep-merge for object fields (same logic as old api.js LS fallback).
 * Cache is updated synchronously; Firestore write is async (fire-and-resilient).
 * @param {object} partial — e.g. { tasks: {...} } or { streak: {...}, lastDate: '...' }
 */
export async function patchUserData(partial) {
  if (_uid === null || _cache === null) {
    console.warn('[EveryDay DB] patchUserData called before init — skipped');
    return;
  }

  // 1. Deep-merge into cache
  const firestorePayload = {};
  for (const [key, val] of Object.entries(partial)) {
    if (
      val !== null &&
      typeof val === 'object' &&
      !Array.isArray(val) &&
      _cache[key] !== null &&
      typeof _cache[key] === 'object' &&
      !Array.isArray(_cache[key])
    ) {
      // Shallow-merge nested objects (e.g. settings: { name } merges into full settings)
      _cache[key] = { ..._cache[key], ...val };
    } else {
      _cache[key] = val;
    }
    // Always write the POST-MERGE value so Firestore gets the full field (no partial overwrites)
    firestorePayload[key] = _cache[key];
  }

  // 2. Stamp every write with a timestamp for latest-write-wins conflict resolution
  const now = new Date().toISOString();
  _cache.lastUpdated = now;
  firestorePayload.lastUpdated = now;

  // 3. Persist to Firestore — merge at the top-level field so other fields are untouched
  try {
    await setDoc(_userDoc(_uid), firestorePayload, { merge: true });
  } catch (err) {
    console.error('[EveryDay DB] Firestore write failed:', err.message);
    // Cache is still updated — app continues working; next boot will reconcile
  }
}

/**
 * listenToUserData — subscribe to real-time Firestore updates.
 *
 * The callback fires ONLY when data changes on ANOTHER device:
 *   snap.metadata.hasPendingWrites === true  → local write echo → SKIP
 *   snap.metadata.hasPendingWrites === false → server update   → CALL onChange
 *
 * @param {string}   uid
 * @param {function} onChange — receives the full updated data object
 * @returns {function} unsubscribe fn (auto-managed internally)
 */
export function listenToUserData(uid, onChange) {
  _uid = uid;

  // Cancel any existing listener first
  if (_unsubscribe) _unsubscribe();

  _unsubscribe = onSnapshot(
    _userDoc(uid),
    { includeMetadataChanges: true },
    (snap) => {
      if (!snap.exists()) return;

      const { hasPendingWrites, fromCache } = snap.metadata;

      // Only call onChange for server-confirmed snapshots that came from
      // ANOTHER device. We skip:
      //   hasPendingWrites = true  → this device's own optimistic local write
      //   fromCache = true         → stale IndexedDB data, not a live server push
      // Both must be false for a real cross-device update.
      if (hasPendingWrites || fromCache) return;

      const fresh = { ...DEFAULT_DATA, ...snap.data() };
      _cache = fresh;
      onChange(fresh);
    },
    (err) => {
      console.warn('[EveryDay DB] onSnapshot error:', err.message);
    },
  );

  return _unsubscribe;
}

/**
 * stopListening — tear down the real-time listener and clear state.
 * Call this on logout so the next user starts clean.
 */
export function stopListening() {
  if (_unsubscribe) {
    _unsubscribe();
    _unsubscribe = null;
  }
  _uid   = null;
  _cache = null;
}
