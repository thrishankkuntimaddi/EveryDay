/**
 * tasks.controller.js
 *
 * Handles GET/PATCH for today's task completion state.
 * Tasks are keyed by date string (YYYY-MM-DD) in the store.
 */

import * as store from '../db/store.js';
import { todayKey } from '../utils/date.js';

/**
 * GET /api/tasks
 * Returns today's task completion map.
 */
export function getTasks(req, res) {
  const today = todayKey();
  const all = store.get('tasks') || {};
  res.json({ date: today, tasks: all[today] || {} });
}

/**
 * PATCH /api/tasks/:taskId
 * Toggle or set the completion status of a task.
 * Body: { done: boolean }  — optional. If omitted, toggles.
 */
export function updateTask(req, res) {
  const { taskId } = req.params;
  const today = todayKey();
  const all = store.get('tasks') || {};

  if (!all[today]) all[today] = {};

  const current = !!all[today][taskId];
  const newVal = req.body?.done !== undefined ? !!req.body.done : !current;

  all[today][taskId] = newVal;
  store.set('tasks', all);

  res.json({ date: today, taskId, done: newVal });
}

/**
 * DELETE /api/tasks/today
 * Reset all task completions for today (daily reset).
 */
export function resetTodayTasks(req, res) {
  const today = todayKey();
  const all = store.get('tasks') || {};
  all[today] = {};
  store.set('tasks', all);
  res.json({ message: 'Today\'s tasks reset.', date: today });
}
