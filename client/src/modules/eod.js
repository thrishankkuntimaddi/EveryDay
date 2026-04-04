/**
 * eod.js — End of Day Reflection module.
 * Submits data to server via api.history.submit().
 */

import { STATE } from './state.js';
import { getOverallProgress } from './blocks.js';
import { updateHeaderStreak } from './header.js';
import api from '../api/api.js';
import { showToast } from '../utils/toast.js';
import { todayKey } from '../utils/date.js';

export function renderEOD() {
  const today = todayKey();
  const existing = STATE.history.find(h => h.date === today);
  if (existing) {
    showEODSubmitted(existing);
  } else {
    resetEODUI();
  }
}

function resetEODUI() {
  const badge = document.getElementById('eod-submitted-badge');
  const body  = document.getElementById('eod-body');
  if (badge) badge.hidden = true;
  if (body)  body.style.opacity = '1';
}

function showEODSubmitted(entry) {
  const badge = document.getElementById('eod-submitted-badge');
  if (badge) badge.hidden = false;

  const yesBtn = document.getElementById('eod-yes');
  const noBtn  = document.getElementById('eod-no');
  if (yesBtn && noBtn) {
    yesBtn.classList.toggle('selected-yes', entry.showed === 'yes');
    noBtn.classList.toggle('selected-no',  entry.showed === 'no');
  }

  document.querySelectorAll('.star-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i < entry.effort);
  });

  const notes = document.getElementById('eod-notes');
  if (notes) notes.value = entry.notes || '';
}

export async function submitEOD() {
  if (!STATE.eod.showed) {
    showToast('Please select if you showed up today.', 'error');
    return;
  }
  if (STATE.eod.effort === 0) {
    showToast('Please rate your effort level.', 'error');
    return;
  }

  const notes = document.getElementById('eod-notes')?.value?.trim() || '';
  const { pct } = getOverallProgress();

  const payload = {
    showed:         STATE.eod.showed,
    effort:         STATE.eod.effort,
    notes,
    tasksCompleted: pct,
    phase:          STATE.phase,
  };

  try {
    const entry = await api.history.submit(payload);
    STATE.history = STATE.history.filter(h => h.date !== todayKey());
    STATE.history.push(entry);

    showEODSubmitted(entry);
    showToast('🌙 Reflection saved. Great work today.', 'success');

    if (STATE.eod.showed === 'yes') {
      await api.streak.confirmShowUp();
      const updatedStreak = await api.streak.get();
      STATE.streak = updatedStreak;
      updateHeaderStreak();
    }
  } catch (err) {
    showToast(`⚠️ Failed to save reflection: ${err.message}`, 'error');
  }
}

export function attachEODListeners() {
  document.getElementById('eod-yes')?.addEventListener('click', () => {
    STATE.eod.showed = 'yes';
    document.getElementById('eod-yes')?.classList.add('selected-yes');
    document.getElementById('eod-no')?.classList.remove('selected-no');
  });

  document.getElementById('eod-no')?.addEventListener('click', () => {
    STATE.eod.showed = 'no';
    document.getElementById('eod-no')?.classList.add('selected-no');
    document.getElementById('eod-yes')?.classList.remove('selected-yes');
  });

  document.querySelectorAll('.star-btn').forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      STATE.eod.effort = parseInt(btn.dataset.val);
      document.querySelectorAll('.star-btn').forEach((b, i) => {
        b.classList.toggle('active', i <= idx);
      });
    });

    btn.addEventListener('mouseenter', () => {
      document.querySelectorAll('.star-btn').forEach((b, i) => {
        b.style.color = i <= idx ? 'var(--accent-amber)' : '';
      });
    });

    btn.addEventListener('mouseleave', () => {
      document.querySelectorAll('.star-btn').forEach((b, i) => {
        b.style.color = i < STATE.eod.effort ? 'var(--accent-amber)' : '';
      });
    });
  });

  document.getElementById('eod-submit')?.addEventListener('click', submitEOD);
}
