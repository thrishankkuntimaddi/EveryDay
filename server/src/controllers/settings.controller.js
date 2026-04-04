/**
 * settings.controller.js
 *
 * Manages user identity + preferences.
 */

import * as store from '../db/store.js';

/**
 * GET /api/settings
 */
export function getSettings(req, res) {
  const settings = store.get('settings') || { name: '', goal: '', reminders: {} };
  res.json(settings);
}

/**
 * PATCH /api/settings
 * Partial update — only provided fields are updated.
 * Body: { name?, goal?, reminders? }
 */
export function updateSettings(req, res) {
  const { name, goal, reminders } = req.body;
  const current = store.get('settings') || { name: '', goal: '', reminders: {} };

  if (name !== undefined)      current.name = name;
  if (goal !== undefined)      current.goal = goal;
  if (reminders !== undefined) current.reminders = reminders;

  store.set('settings', current);
  res.json(current);
}

/**
 * GET /api/settings/phase
 * Return current growth phase.
 */
export function getPhase(req, res) {
  res.json({ phase: store.get('phase') || 'stabilization' });
}

/**
 * PATCH /api/settings/phase
 * Set current growth phase.
 * Body: { phase: 'stabilization' | 'control' | 'intensity' | 'expansion' }
 */
export function setPhase(req, res) {
  const { phase } = req.body;
  const valid = ['stabilization', 'control', 'intensity', 'expansion'];

  if (!phase || !valid.includes(phase)) {
    return res.status(400).json({ error: `Invalid phase. Must be one of: ${valid.join(', ')}` });
  }

  store.set('phase', phase);
  res.json({ phase });
}
