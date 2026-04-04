/**
 * state.js — Centralized reactive client-side state.
 *
 * This is NOT localStorage — state is loaded from the server on boot
 * and kept in memory. The server is the source of truth.
 */

export const STATE = {
  // Loaded from server
  tasks: {},         // { [taskId]: boolean } — today's tasks
  streak: { count: 0, lastDate: null, longest: 0 },
  history: [],
  settings: { name: '', goal: '', reminders: {} },
  phase: 'stabilization',

  // Local UI state (not persisted to server)
  minimumMode: false,
  currentView: 'dashboard',
  focusBlock: null,
  timerInterval: null,
  timerSeconds: 25 * 60,
  timerRunning: false,
  notificationsEnabled: false,
  eod: { showed: null, effort: 0, notes: '' },
  eodLocked: false,     // true after EOD submission until 4AM next day
  isLoading: false,
  serverError: false,
};
