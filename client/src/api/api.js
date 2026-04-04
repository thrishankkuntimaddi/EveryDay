/**
 * api.js — Centralized API client for the EveryDay server.
 *
 * HYBRID MODE:
 * - If the server is reachable, all data goes to/from the Express API.
 * - If the server is NOT reachable (e.g. GitHub Pages), falls back to
 *   localStorage so the app remains fully functional as a static app.
 *
 * Usage:
 *   import api from './api/api.js';
 *   const tasks = await api.getTasks();
 *   await api.toggleTask('morning-1');
 */

const BASE = '/api';

// ── Server reachability flag ───────────────────────────────────────────────
// Set to false on first failed request; reset on successful health check.
let _serverAvailable = true;
let _checkedServer = false;

export async function checkServerAvailability() {
  try {
    const res = await fetch(`${BASE}/health`, { signal: AbortSignal.timeout(2000) });
    _serverAvailable = res.ok;
  } catch {
    _serverAvailable = false;
  }
  _checkedServer = true;
  return _serverAvailable;
}

export function isServerAvailable() { return _serverAvailable; }

// ── localStorage fallback helpers ─────────────────────────────────────────────
const LS_KEYS = {
  tasks:    'nista_tasks',
  streak:   'nista_streak',
  history:  'nista_history',
  settings: 'nista_settings',
  phase:    'nista_phase',
  lastDate: 'nista_last_date',
};

function lsGet(key, fallback = null) {
  try {
    const v = localStorage.getItem(key);
    return v !== null ? JSON.parse(v) : fallback;
  } catch { return fallback; }
}

function lsSet(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function isYesterday(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return d.toDateString() === yesterday.toDateString();
}

// ── Core fetch wrapper (server mode) ─────────────────────────────────────────
async function request(path, options = {}) {
  const url = `${BASE}${path}`;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });

  let data;
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) {
    data = await res.json();
  } else {
    data = await res.text();
  }

  if (!res.ok) {
    const errMsg = (typeof data === 'object' && data?.error) ? data.error : `HTTP ${res.status}`;
    throw new Error(errMsg);
  }
  return data;
}

// ══════════════════════════════════════════════════════════════════════════════
// TASKS
// ══════════════════════════════════════════════════════════════════════════════
const tasks = {
  getToday: async () => {
    if (_serverAvailable) return request('/tasks');
    // localStorage fallback
    const today = todayKey();
    const all = lsGet(LS_KEYS.tasks, {});
    return { date: today, tasks: all[today] || {} };
  },

  toggle: async (taskId, done) => {
    if (_serverAvailable) {
      const body = done !== undefined ? JSON.stringify({ done }) : undefined;
      return request(`/tasks/${taskId}`, { method: 'PATCH', body });
    }
    // localStorage fallback
    const today = todayKey();
    const all = lsGet(LS_KEYS.tasks, {});
    if (!all[today]) all[today] = {};
    const newVal = done !== undefined ? done : !all[today][taskId];
    all[today][taskId] = newVal;
    lsSet(LS_KEYS.tasks, all);
    return { date: today, taskId, done: newVal };
  },

  resetToday: async () => {
    if (_serverAvailable) return request('/tasks/today', { method: 'DELETE' });
    const today = todayKey();
    const all = lsGet(LS_KEYS.tasks, {});
    all[today] = {};
    lsSet(LS_KEYS.tasks, all);
    return { message: "Today's tasks reset.", date: today };
  },
};

// ══════════════════════════════════════════════════════════════════════════════
// STREAK
// ══════════════════════════════════════════════════════════════════════════════
const streak = {
  get: async () => {
    if (_serverAvailable) return request('/streak');
    return lsGet(LS_KEYS.streak, { count: 0, lastDate: null, longest: 0 });
  },

  update: async () => {
    if (_serverAvailable) return request('/streak/update', { method: 'POST' });
    // localStorage fallback — replicate server streak logic
    const today = todayKey();
    const lastDate = lsGet(LS_KEYS.lastDate);
    const streakData = lsGet(LS_KEYS.streak, { count: 0, lastDate: null, longest: 0 });

    let newDay = false;
    if (lastDate !== today) {
      newDay = true;
      // Reset today's tasks
      const allTasks = lsGet(LS_KEYS.tasks, {});
      allTasks[today] = {};
      lsSet(LS_KEYS.tasks, allTasks);

      if (lastDate && isYesterday(lastDate)) {
        streakData.count += 1;
        if (streakData.count > streakData.longest) streakData.longest = streakData.count;
      } else if (lastDate && lastDate !== today) {
        streakData.count = 0;
      }
      streakData.lastDate = today;
      lsSet(LS_KEYS.streak, streakData);
      lsSet(LS_KEYS.lastDate, today);
    }

    return { updated: newDay, newDay, streak: streakData };
  },

  confirmShowUp: async () => {
    if (_serverAvailable) return request('/streak/showup', { method: 'PATCH' });
    const today = todayKey();
    const streakData = lsGet(LS_KEYS.streak, { count: 0, lastDate: null, longest: 0 });
    streakData.count = Math.max(streakData.count, 1);
    if (streakData.count > streakData.longest) streakData.longest = streakData.count;
    streakData.lastDate = today;
    lsSet(LS_KEYS.streak, streakData);
    return { streak: streakData };
  },
};

// ══════════════════════════════════════════════════════════════════════════════
// HISTORY
// ══════════════════════════════════════════════════════════════════════════════
const history = {
  getAll: async () => {
    if (_serverAvailable) return request('/history');
    const h = lsGet(LS_KEYS.history, []);
    return [...h].sort((a, b) => b.date.localeCompare(a.date));
  },

  getToday: async () => {
    if (_serverAvailable) return request('/history/today');
    const today = todayKey();
    const h = lsGet(LS_KEYS.history, []);
    return h.find(e => e.date === today) || null;
  },

  submit: async (payload) => {
    if (_serverAvailable) {
      return request('/history', { method: 'POST', body: JSON.stringify(payload) });
    }
    // localStorage fallback
    const today = todayKey();
    let h = lsGet(LS_KEYS.history, []);
    h = h.filter(e => e.date !== today);
    const entry = { ...payload, date: today, submittedAt: new Date().toISOString() };
    h.push(entry);
    lsSet(LS_KEYS.history, h);
    return entry;
  },
};

// ══════════════════════════════════════════════════════════════════════════════
// SETTINGS
// ══════════════════════════════════════════════════════════════════════════════
const settings = {
  get: async () => {
    if (_serverAvailable) return request('/settings');
    return lsGet(LS_KEYS.settings, { name: '', goal: '', reminders: {} });
  },

  update: async (partial) => {
    if (_serverAvailable) {
      return request('/settings', { method: 'PATCH', body: JSON.stringify(partial) });
    }
    const current = lsGet(LS_KEYS.settings, { name: '', goal: '', reminders: {} });
    const updated = { ...current, ...partial };
    lsSet(LS_KEYS.settings, updated);
    return updated;
  },

  getPhase: async () => {
    if (_serverAvailable) return request('/settings/phase');
    return { phase: lsGet(LS_KEYS.phase, 'stabilization') };
  },

  setPhase: async (phase) => {
    if (_serverAvailable) {
      return request('/settings/phase', { method: 'PATCH', body: JSON.stringify({ phase }) });
    }
    lsSet(LS_KEYS.phase, phase);
    return { phase };
  },
};

// ══════════════════════════════════════════════════════════════════════════════
// DATA
// ══════════════════════════════════════════════════════════════════════════════
const data = {
  export: async () => {
    if (_serverAvailable) {
      const res = await fetch(`${BASE}/data/export`);
      if (!res.ok) throw new Error('Export failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const today = todayKey();
      const a = document.createElement('a');
      a.href = url; a.download = `everyday-backup-${today}.json`; a.click();
      URL.revokeObjectURL(url);
      return;
    }
    // localStorage fallback — export everything from LS
    const snapshot = {
      tasks:    lsGet(LS_KEYS.tasks, {}),
      streak:   lsGet(LS_KEYS.streak, {}),
      history:  lsGet(LS_KEYS.history, []),
      settings: lsGet(LS_KEYS.settings, {}),
      phase:    lsGet(LS_KEYS.phase, 'stabilization'),
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `everyday-backup-${todayKey()}.json`; a.click();
    URL.revokeObjectURL(url);
  },

  reset: async () => {
    if (_serverAvailable) {
      return request('/data/reset', { method: 'DELETE', headers: { 'X-Confirm-Reset': 'yes' } });
    }
    Object.values(LS_KEYS).forEach(k => localStorage.removeItem(k));
    return { message: 'All data reset successfully.' };
  },
};

// ══════════════════════════════════════════════════════════════════════════════
// HEALTH
// ══════════════════════════════════════════════════════════════════════════════
const health = {
  check: () => request('/health'),
};

export default { tasks, streak, history, settings, data, health };
