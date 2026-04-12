/**
 * settings.js — Settings view: identity, block reminders (12h), data.
 *
 * Reminders are auto-generated from the live BLOCKS array.
 * Each reminder row has:
 *   - Block icon + name label
 *   - 12h time picker  (Hour ▾  :  Minute ▾  AM/PM toggle)
 *   - Enable / disable toggle
 */

import { STATE }  from './state.js';
import { BLOCKS } from './data.js';
import api         from '../api/api.js';
import { showToast } from '../utils/toast.js';
import { scheduleReminders } from './notifications.js';

import { auth, logout, changePassword, deleteCurrentUser } from '../lib/auth.js';
import { patchUserData } from '../lib/db.js';

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Convert "HH:MM" (24h) → { h12, minute, period } */
function from24(str) {
  const [hRaw, mRaw] = (str || '06:00').split(':').map(Number);
  const period = hRaw < 12 ? 'AM' : 'PM';
  let h12 = hRaw % 12;
  if (h12 === 0) h12 = 12;
  return { h12, minute: mRaw, period };
}

/** Convert { h12, minute, period } → "HH:MM" (24h) */
function to24({ h12, minute, period }) {
  let h = h12 % 12;
  if (period === 'PM') h += 12;
  return `${String(h).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

/** Pull the first HH:MM from a block's time string, e.g. "09:00 – 12:00" → "09:00" */
function blockStartTime(block) {
  const m = (block.time || '').match(/\d{2}:\d{2}/);
  return m ? m[0] : '09:00';
}

// ── Render Reminder List ──────────────────────────────────────────────────────

export function renderSettings() {
  // Identity fields
  const nameInput = document.getElementById('user-name');
  const goalInput = document.getElementById('user-goal');
  if (nameInput) nameInput.value = STATE.settings.name || '';
  if (goalInput) goalInput.value = STATE.settings.goal || '';

  // Show signed-in email in Account card
  const emailEl = document.getElementById('settings-account-email');
  if (emailEl && auth.currentUser?.email) {
    emailEl.textContent = `Signed in as ${auth.currentUser.email}`;
  }

  // Build reminder rows from BLOCKS
  const container = document.getElementById('reminder-list');
  if (!container) return;

  const saved = STATE.settings.reminders || {};  // { [blockId]: { time24, enabled } }

  container.innerHTML = BLOCKS.map(block => {
    const stored  = saved[block.id] || {};
    const time24  = stored.time24 || blockStartTime(block);
    const enabled = stored.enabled !== false; // default on
    const { h12, minute, period } = from24(time24);

    const hourOptions = Array.from({ length: 12 }, (_, i) => {
      const v = i + 1;
      return `<option value="${v}" ${v === h12 ? 'selected' : ''}>${v}</option>`;
    }).join('');

    const minOptions = ['00','05','10','15','20','25','30','35','40','45','50','55'].map(m => {
      const v = parseInt(m, 10);
      return `<option value="${v}" ${v === minute ? 'selected' : ''}>${m}</option>`;
    }).join('');

    return `
      <div class="reminder-row ${enabled ? '' : 'reminder-row--off'}" data-block="${block.id}">
        <div class="reminder-label">
          <span class="reminder-icon">${block.icon}</span>
          <span class="reminder-name">${block.name}</span>
        </div>
        <div class="reminder-controls">
          <div class="time-picker-12h">
            <select class="tp-hour" data-block="${block.id}" aria-label="Hour">
              ${hourOptions}
            </select>
            <span class="tp-colon">:</span>
            <select class="tp-min" data-block="${block.id}" aria-label="Minute">
              ${minOptions}
            </select>
            <button class="tp-period ${period === 'AM' ? 'is-am' : 'is-pm'}"
                    data-block="${block.id}" data-period="${period}"
                    type="button" aria-label="Toggle AM/PM">
              ${period}
            </button>
          </div>
          <label class="rem-toggle" title="${enabled ? 'Disable' : 'Enable'} reminder">
            <input type="checkbox" class="rem-toggle-cb" data-block="${block.id}"
                   ${enabled ? 'checked' : ''} />
            <span class="rem-toggle-slider"></span>
          </label>
        </div>
      </div>
    `;
  }).join('');

  // AM/PM button toggle
  container.querySelectorAll('.tp-period').forEach(btn => {
    btn.addEventListener('click', () => {
      const cur = btn.dataset.period;
      const next = cur === 'AM' ? 'PM' : 'AM';
      btn.dataset.period = next;
      btn.textContent   = next;
      btn.className = `tp-period ${next === 'AM' ? 'is-am' : 'is-pm'}`;
    });
  });

  // Dim row when toggled off
  container.querySelectorAll('.rem-toggle-cb').forEach(cb => {
    cb.addEventListener('change', () => {
      const row = cb.closest('.reminder-row');
      row.classList.toggle('reminder-row--off', !cb.checked);
    });
  });
}

// ── Listeners ─────────────────────────────────────────────────────────────────

export function attachSettingsListeners() {
  // Identity save
  document.getElementById('save-identity')?.addEventListener('click', async () => {
    const name = document.getElementById('user-name')?.value?.trim() || '';
    const goal = document.getElementById('user-goal')?.value?.trim() || '';
    try {
      const updated = await api.settings.update({ name, goal });
      STATE.settings.name = updated.name;
      STATE.settings.goal = updated.goal;
      showToast('✅ Identity saved!', 'success');
    } catch {
      showToast('⚠️ Failed to save identity', 'error');
    }
  });

  // Reminders save — read all rows
  document.getElementById('save-reminders')?.addEventListener('click', async () => {
    const container = document.getElementById('reminder-list');
    const reminders = {};

    container.querySelectorAll('.reminder-row').forEach(row => {
      const blockId = row.dataset.block;
      const h12     = parseInt(row.querySelector('.tp-hour').value, 10);
      const minute  = parseInt(row.querySelector('.tp-min').value,  10);
      const period  = row.querySelector('.tp-period').dataset.period;
      const enabled = row.querySelector('.rem-toggle-cb').checked;
      reminders[blockId] = { time24: to24({ h12, minute, period }), enabled };
    });

    try {
      await api.settings.update({ reminders });
      STATE.settings.reminders = reminders;
      showToast('🔔 Reminders saved!', 'success');
      if (STATE.notificationsEnabled) scheduleReminders();
    } catch {
      showToast('⚠️ Failed to save reminders', 'error');
    }
  });

  // Export — full JSON download (reads from STATE + Firestore cache only)
  document.getElementById('export-data')?.addEventListener('click', () => {
    try {
      const today = new Date();
      const dateKey = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
      const exportPayload = {
        exportedAt: today.toISOString(),
        tasks:      STATE.tasks,
        history:    STATE.history,
        settings:   STATE.settings,
        phase:      STATE.phase,
        streak:     STATE.streak,
      };
      const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: 'application/json' });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href     = url;
      a.download = `everyday-backup-${dateKey}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('📤 Data exported! File downloaded.', 'success');
    } catch (err) {
      showToast('⚠️ Export failed: ' + err.message, 'error');
    }
  });

  // Import — restore from JSON file → Firestore only
  document.getElementById('import-data-file')?.addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text);

      // Build patch payload from whatever fields are present in the backup
      const patch = {};
      if (data.tasks)    patch.tasks    = data.tasks;
      if (data.history)  patch.history  = data.history;
      if (data.streak)   patch.streak   = data.streak;
      if (data.phase)    patch.phase    = data.phase;
      if (data.settings) patch.settings = data.settings;

      await patchUserData(patch);
      showToast('📥 Data imported! Refreshing...', 'success');
      setTimeout(() => location.reload(), 1200);
    } catch (err) {
      showToast('⚠️ Import failed — invalid JSON file', 'error');
    }
    // Reset input so user can re-upload
    e.target.value = '';
  });

  // Reset All Data — Firestore only
  document.getElementById('reset-data')?.addEventListener('click', async () => {
    if (!confirm('⚠️ This will permanently delete ALL your data and reset to the boilerplate. Are you absolutely sure?')) return;
    if (!confirm('Last warning — this cannot be undone. Confirm?')) return;
    try {
      await api.data.reset();
      showToast('🗑 All data cleared. Reloading...', 'success');
      setTimeout(() => location.reload(), 800);
    } catch (err) {
      showToast('⚠️ Reset failed: ' + err.message, 'error');
    }
  });

  // Logout — immediate reload, no async race
  document.getElementById('logout-btn')?.addEventListener('click', async () => {
    try { await logout(); } catch (err) {
      showToast('⚠️ Sign out failed: ' + err.message, 'error');
      return;
    }
    location.reload();
  });

  // Change Password
  document.getElementById('change-password-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const currentPwd = document.getElementById('settings-current-pwd')?.value;
    const newPwd     = document.getElementById('settings-new-pwd')?.value;
    const confirmPwd = document.getElementById('settings-confirm-pwd')?.value;

    if (!currentPwd || !newPwd || !confirmPwd) {
      showToast('⚠️ Please fill in all password fields.', 'error'); return;
    }
    if (newPwd !== confirmPwd) {
      showToast('⚠️ New passwords do not match.', 'error'); return;
    }
    if (newPwd.length < 6) {
      showToast('⚠️ New password must be at least 6 characters.', 'error'); return;
    }
    const btn = document.getElementById('change-password-btn');
    if (btn) { btn.disabled = true; btn.textContent = 'Updating…'; }
    try {
      await changePassword(currentPwd, newPwd);
      showToast('✅ Password updated successfully!', 'success');
      e.target.reset();
    } catch (err) {
      const msg = err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential'
        ? 'Current password is incorrect.'
        : err.message;
      showToast('⚠️ ' + msg, 'error');
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = 'Update Password'; }
    }
  });

  // Delete Account (requires password re-auth)
  document.getElementById('delete-account-btn')?.addEventListener('click', async () => {
    if (!confirm('⚠️ This will permanently delete your account AND all your data. This cannot be undone.')) return;

    const currentPwd = prompt('Enter your current password to confirm account deletion:');
    if (!currentPwd) return;

    try {
      // Wipe Firestore data first, then delete auth account
      await patchUserData({
        tasks: {}, streak: { count: 0, lastDate: null, longest: 0 },
        history: [], settings: { name: '', goal: '', reminders: {} },
        phase: 'stabilization', lastDate: null,
        customPlan: null, taskDescs: {}, immediateTasks: [],
        eodLocked: null, planTomorrow: null,
      });
      // Re-auth + delete (throws if wrong password)
      await deleteCurrentUser(currentPwd);
      showToast('Account deleted.', 'success');
      setTimeout(() => location.reload(), 600);
    } catch (err) {
      const msg = err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential'
        ? '⚠️ Incorrect password — account not deleted.'
        : '⚠️ Delete failed: ' + err.message;
      showToast(msg, 'error');
    }
  });
}
