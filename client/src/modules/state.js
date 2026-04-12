/**
 * state.js — Centralized reactive client-side state.
 *
 * This is NOT localStorage — state is hydrated from Firestore on boot
 * and kept in memory. Firestore is the single source of truth.
 */

export const STATE = {
  // Hydrated from Firestore on boot
  tasks: {},         // { [taskId]: boolean } — today's tasks
  streak: { count: 0, lastDate: null, longest: 0 },
  history: [],
  settings: { name: '', goal: '', reminders: {} },
  phase: 'stabilization',

  // Local UI state (not persisted to server)
  expandedBlocks: new Set(), // tracks which block IDs are currently expanded
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
