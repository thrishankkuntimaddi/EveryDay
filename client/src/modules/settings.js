/**
 * settings.js — Settings view: save identity, reminders, phase; data export/reset.
 */

import { STATE } from './state.js';
import api from '../api/api.js';
import { showToast } from '../utils/toast.js';
import { scheduleReminders } from './notifications.js';

export function renderSettings() {
  const nameInput = document.getElementById('user-name');
  const goalInput = document.getElementById('user-goal');
  if (nameInput) nameInput.value = STATE.settings.name || '';
  if (goalInput) goalInput.value = STATE.settings.goal || '';

  const rem = STATE.settings.reminders || {};
  if (rem.morning) document.getElementById('remind-morning').value = rem.morning;
  if (rem.work1)   document.getElementById('remind-work1').value   = rem.work1;
  if (rem.evening) document.getElementById('remind-evening').value = rem.evening;
  if (rem.night)   document.getElementById('remind-night').value   = rem.night;
}

export function attachSettingsListeners() {
  document.getElementById('save-identity')?.addEventListener('click', async () => {
    const name = document.getElementById('user-name')?.value?.trim() || '';
    const goal = document.getElementById('user-goal')?.value?.trim() || '';

    try {
      const updated = await api.settings.update({ name, goal });
      STATE.settings.name = updated.name;
      STATE.settings.goal = updated.goal;
      showToast('✅ Identity saved!', 'success');
    } catch (err) {
      showToast('⚠️ Failed to save identity', 'error');
    }
  });

  document.getElementById('save-reminders')?.addEventListener('click', async () => {
    const reminders = {
      morning: document.getElementById('remind-morning')?.value,
      work1:   document.getElementById('remind-work1')?.value,
      evening: document.getElementById('remind-evening')?.value,
      night:   document.getElementById('remind-night')?.value,
    };

    try {
      await api.settings.update({ reminders });
      STATE.settings.reminders = reminders;
      showToast('✅ Reminders saved!', 'success');
      if (STATE.notificationsEnabled) {
        scheduleReminders();
      }
    } catch (err) {
      showToast('⚠️ Failed to save reminders', 'error');
    }
  });

  document.getElementById('export-data')?.addEventListener('click', async () => {
    try {
      await api.data.export();
      showToast('📤 Data exported successfully!', 'success');
    } catch (err) {
      showToast('⚠️ Export failed', 'error');
    }
  });

  document.getElementById('reset-data')?.addEventListener('click', async () => {
    if (!confirm('⚠️ This will permanently delete ALL your data. Are you absolutely sure?')) return;
    if (!confirm('Last warning — this cannot be undone. Confirm?')) return;

    try {
      await api.data.reset();
      showToast('🗑 All data cleared. Refreshing...', 'success');
      setTimeout(() => location.reload(), 1500);
    } catch (err) {
      showToast('⚠️ Reset failed: ' + err.message, 'error');
    }
  });
}
