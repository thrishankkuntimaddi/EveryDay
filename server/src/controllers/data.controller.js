/**
 * data.controller.js
 *
 * Handles full data export and destructive reset.
 */

import * as store from '../db/store.js';
import { todayKey } from '../utils/date.js';

/**
 * GET /api/data/export
 * Returns a full JSON export of all stored data.
 */
export function exportData(req, res) {
  const snapshot = store.snapshot();
  snapshot.exportedAt = new Date().toISOString();
  res.setHeader('Content-Disposition', `attachment; filename="everyday-backup-${todayKey()}.json"`);
  res.setHeader('Content-Type', 'application/json');
  res.json(snapshot);
}

/**
 * DELETE /api/data/reset
 * Wipes all stored data and resets to defaults.
 * Requires confirmation header: X-Confirm-Reset: yes
 */
export function resetAllData(req, res) {
  const confirm = req.headers['x-confirm-reset'];
  if (confirm !== 'yes') {
    return res.status(400).json({ error: 'Send header X-Confirm-Reset: yes to confirm.' });
  }

  store.set('tasks', {});
  store.set('streak', { count: 0, lastDate: null, longest: 0 });
  store.set('history', []);
  store.set('settings', { name: '', goal: '', reminders: {} });
  store.set('phase', 'stabilization');
  store.set('lastDate', null);

  res.json({ message: 'All data reset successfully.' });
}
