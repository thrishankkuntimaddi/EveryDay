/**
 * history.controller.js
 *
 * Manages daily EOD reflection history.
 */

import * as store from '../db/store.js';
import { todayKey } from '../utils/date.js';

/**
 * GET /api/history
 * Returns all history entries, sorted newest first.
 */
export function getHistory(req, res) {
  const history = store.get('history') || [];
  const sorted = [...history].sort((a, b) => b.date.localeCompare(a.date));
  res.json(sorted);
}

/**
 * POST /api/history
 * Submit or overwrite today's EOD entry.
 * Body: { showed, effort, notes, tasksCompleted, phase }
 */
export function submitReflection(req, res) {
  const { showed, effort, notes, tasksCompleted, phase } = req.body;

  if (!showed || !effort) {
    return res.status(400).json({ error: 'showed and effort are required.' });
  }

  const today = todayKey();
  let history = store.get('history') || [];

  // Remove any existing entry for today (overwrite pattern)
  history = history.filter(h => h.date !== today);

  const entry = {
    date: today,
    showed,
    effort: Number(effort),
    notes: notes || '',
    tasksCompleted: tasksCompleted ?? null,
    phase: phase || 'stabilization',
    submittedAt: new Date().toISOString(),
  };

  history.push(entry);
  store.set('history', history);

  res.status(201).json(entry);
}

/**
 * GET /api/history/today
 * Returns today's history entry if it exists.
 */
export function getTodayReflection(req, res) {
  const today = todayKey();
  const history = store.get('history') || [];
  const entry = history.find(h => h.date === today) || null;
  res.json(entry);
}
