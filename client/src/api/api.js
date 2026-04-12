/**
 * api.js — Firestore-backed data client for EveryDay.
 *
 * All data flows through Firestore (via getCached / patchUserData from db.js).
 *
 * F6 — Dead server-mode branches removed. The Express server path
 *      (_serverAvailable) was permanently false and could never be reached.
 *      Removing it eliminates ~30 lines of unreachable code and the
 *      maintenance risk of someone accidentally enabling the wrong path.
 *
 * forceFirestoreMode() is kept as a no-op so main.js import doesn't break.
 */

import { getCached, patchUserData } from '../lib/db.js';

// ── Kept as no-op for backward-compatibility with main.js import ──────────────
export function forceFirestoreMode() {}

// ── Date helpers ──────────────────────────────────────────────────────────────

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function isYesterday(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return d.toDateString() === yesterday.toDateString();
}

// ── F5: Task date pruning helper ──────────────────────────────────────────────
// Removes task entries older than KEEP_DAYS to prevent the single Firestore
// document from approaching the 1 MiB limit over months of use.

const KEEP_DAYS = 30;

function pruneOldTaskDates(allTasks) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - KEEP_DAYS);
  const cutoffKey = `${cutoff.getFullYear()}-${String(cutoff.getMonth() + 1).padStart(2, '0')}-${String(cutoff.getDate()).padStart(2, '0')}`;
  for (const dateKey of Object.keys(allTasks)) {
    if (dateKey < cutoffKey) delete allTasks[dateKey];
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// TASKS
// ══════════════════════════════════════════════════════════════════════════════
const tasks = {
  getToday: async () => {
    const today = todayKey();
    const all   = getCached('tasks', {});
    return { date: today, tasks: all[today] || {} };
  },

  toggle: async (taskId, done) => {
    const today = todayKey();
    const all   = getCached('tasks', {});
    if (!all[today]) all[today] = {};
    const newVal = done !== undefined ? done : !all[today][taskId];
    all[today][taskId] = newVal;
    await patchUserData({ tasks: all });
    return { date: today, taskId, done: newVal };
  },

  resetToday: async () => {
    const today = todayKey();
    const all   = getCached('tasks', {});
    all[today]  = {};
    await patchUserData({ tasks: all });
    return { message: "Today's tasks reset.", date: today };
  },
};

// ══════════════════════════════════════════════════════════════════════════════
// STREAK
// ══════════════════════════════════════════════════════════════════════════════
const streak = {
  get: async () => {
    return getCached('streak', { count: 0, lastDate: null, longest: 0 });
  },

  update: async () => {
    const today      = todayKey();
    const lastDate   = getCached('lastDate', null);
    const streakData = { ...getCached('streak', { count: 0, lastDate: null, longest: 0 }) };

    let newDay = false;
    if (lastDate !== today) {
      newDay = true;

      // Reset today's tasks
      const allTasks  = getCached('tasks', {});
      allTasks[today] = {};

      // F5 — Prune task entries older than 30 days to keep document size bounded
      pruneOldTaskDates(allTasks);

      // Update streak count
      if (lastDate && isYesterday(lastDate)) {
        streakData.count += 1;
        if (streakData.count > streakData.longest) streakData.longest = streakData.count;
      } else if (lastDate && lastDate !== today) {
        streakData.count = 0; // streak broken
      }
      streakData.lastDate = today;

      // Write tasks + streak + lastDate in one Firestore call
      await patchUserData({ tasks: allTasks, streak: streakData, lastDate: today });
    }

    return { updated: newDay, newDay, streak: streakData };
  },

  confirmShowUp: async () => {
    const today      = todayKey();
    const streakData = { ...getCached('streak', { count: 0, lastDate: null, longest: 0 }) };
    streakData.count = Math.max(streakData.count, 1);
    if (streakData.count > streakData.longest) streakData.longest = streakData.count;
    streakData.lastDate = today;
    await patchUserData({ streak: streakData });
    return { streak: streakData };
  },
};

// ══════════════════════════════════════════════════════════════════════════════
// HISTORY
// ══════════════════════════════════════════════════════════════════════════════
const history = {
  getAll: async () => {
    const h = getCached('history', []);
    return [...h].sort((a, b) => b.date.localeCompare(a.date));
  },

  getToday: async () => {
    const today = todayKey();
    const h     = getCached('history', []);
    return h.find(e => e.date === today) || null;
  },

  submit: async (payload) => {
    const today = todayKey();
    const h     = [...getCached('history', [])].filter(e => e.date !== today);
    const entry = { ...payload, date: today, submittedAt: new Date().toISOString() };
    h.push(entry);
    await patchUserData({ history: h });
    return entry;
  },
};

// ══════════════════════════════════════════════════════════════════════════════
// SETTINGS
// ══════════════════════════════════════════════════════════════════════════════
const settings = {
  get: async () => {
    return getCached('settings', { name: '', goal: '', reminders: {} });
  },

  update: async (partial) => {
    // patchUserData handles the deep-merge for nested objects (e.g. settings.reminders)
    await patchUserData({ settings: partial });
    return getCached('settings', { name: '', goal: '', reminders: {} });
  },

  getPhase: async () => {
    return { phase: getCached('phase', 'stabilization') };
  },

  setPhase: async (phase) => {
    await patchUserData({ phase });
    return { phase };
  },
};

// ══════════════════════════════════════════════════════════════════════════════
// DATA
// ══════════════════════════════════════════════════════════════════════════════
const data = {
  export: async () => {
    const snapshot = {
      tasks:      getCached('tasks',    {}),
      streak:     getCached('streak',   {}),
      history:    getCached('history',  []),
      settings:   getCached('settings', {}),
      phase:      getCached('phase',    'stabilization'),
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = `everyday-backup-${todayKey()}.json`; a.click();
    URL.revokeObjectURL(url);
  },

  reset: async () => {
    await patchUserData({
      tasks:    {},
      streak:   { count: 0, lastDate: null, longest: 0 },
      history:  [],
      settings: { name: '', goal: '', reminders: {} },
      phase:    'stabilization',
      lastDate: null,
    });
    return { message: 'All data reset successfully.' };
  },
};

// ══════════════════════════════════════════════════════════════════════════════
// HEALTH  (kept for any callers that still reference api.health.check)
// ══════════════════════════════════════════════════════════════════════════════
const health = {
  check: () => Promise.resolve({ status: 'firestore-only' }),
};

export default { tasks, streak, history, settings, data, health };
