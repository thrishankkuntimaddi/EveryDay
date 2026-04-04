/**
 * eod.js — End of Day Reflection module.
 *
 * UNLOCK CONDITIONS (either/or):
 *   • Current time ≥ 17:00 (5 PM)  OR  task completion ≥ 80%
 *
 * ONE SUBMISSION PER DAY — no re-editing after save.
 */

import { STATE } from './state.js';
import { getOverallProgress } from './blocks.js';
import { updateHeaderStreak } from './header.js';
import api from '../api/api.js';
import { showToast } from '../utils/toast.js';
import { todayKey } from '../utils/date.js';

// ── Unlock conditions ─────────────────────────────────────────────────────────

function isAfter5PM() {
  return new Date().getHours() >= 17;
}

function isEODUnlocked() {
  const { pct } = getOverallProgress();
  return isAfter5PM() || pct >= 80;
}

function isSubmittedToday() {
  return STATE.history.some(h => h.date === todayKey());
}

// ── Render entry point ────────────────────────────────────────────────────────

export function renderEOD() {
  const today    = todayKey();
  const existing = STATE.history.find(h => h.date === today);

  if (existing) {
    _showBody();
    _showSubmittedValues(existing);
    _freezeForm();
    return;
  }

  resetEODUI();

  if (isEODUnlocked()) {
    _hideLock();
  } else {
    _showLock();
  }
}

// ── Called reactively when progress changes (via 'everyday:progress' event) ───

export function updateEODLockState() {
  if (isSubmittedToday()) return; // already done — don't touch
  if (isEODUnlocked()) {
    _hideLock();
  } else {
    _showLock();
  }
}

// ── Lock overlay ──────────────────────────────────────────────────────────────

function _showLock() {
  const { pct }  = getOverallProgress();
  const pctLeft  = Math.max(0, 80 - pct);
  const now      = new Date();
  const minLeft  = Math.max(0, (17 * 60) - (now.getHours() * 60 + now.getMinutes()));
  const timeStr  = minLeft > 60
    ? `${Math.ceil(minLeft / 60)}h ${minLeft % 60}m`
    : `${minLeft}m`;

  const lockEl = document.getElementById('eod-lock-overlay');
  const body   = document.getElementById('eod-body');

  if (body)   body.style.display = 'none';
  if (lockEl) {
    lockEl.hidden = false;
    lockEl.innerHTML = `
      <div class="eod-lock-icon">🔒</div>
      <div class="eod-lock-content">
        <p class="eod-lock-title">Reflection unlocks when you're ready</p>
        <p class="eod-lock-caption">
          ${pct >= 80
            ? '✓ Task threshold met — waiting for 5 PM'
            : `Complete <strong>${pctLeft}% more tasks</strong> — or wait until <strong>5:00 PM</strong> ${isAfter5PM() ? '' : `(${timeStr} away)`}`
          }
        </p>
        <div class="eod-lock-track-row">
          <div class="eod-lock-track">
            <div class="eod-lock-fill" style="width: ${Math.min(pct, 100)}%"></div>
            <div class="eod-lock-threshold" style="left: 80%"></div>
          </div>
          <span class="eod-lock-pct">${pct}%</span>
        </div>
        <p class="eod-lock-hint">Target: 80% tasks or 5 PM</p>
      </div>
    `;
  }
}

function _hideLock() {
  const lockEl = document.getElementById('eod-lock-overlay');
  const body   = document.getElementById('eod-body');
  if (lockEl) lockEl.hidden = true;
  if (body)   body.style.display = '';
}

function _showBody() {
  _hideLock();
}

// ── Submitted view ────────────────────────────────────────────────────────────

function _showSubmittedValues(entry) {
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
  if (notes) {
    notes.value    = entry.notes || '';
    notes.readOnly = true;
  }
}

function _freezeForm() {
  // Make entire form read-only after submission
  const submitBtn = document.getElementById('eod-submit');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = '✓ Submitted for Today';
    submitBtn.classList.add('eod-submitted-state');
  }
  document.querySelectorAll('#eod-body .eod-option, #eod-body .star-btn').forEach(el => {
    el.style.pointerEvents = 'none';
    el.style.cursor = 'default';
  });
}

// ── Reset (fresh day) ─────────────────────────────────────────────────────────

function resetEODUI() {
  const badge = document.getElementById('eod-submitted-badge');
  if (badge) badge.hidden = true;

  const notes = document.getElementById('eod-notes');
  if (notes) {
    notes.value    = '';
    notes.readOnly = false;
  }

  const submitBtn = document.getElementById('eod-submit');
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Save Reflection';
    submitBtn.classList.remove('eod-submitted-state');
  }

  document.querySelectorAll('#eod-body .eod-option, #eod-body .star-btn').forEach(el => {
    el.style.pointerEvents = '';
    el.style.cursor = '';
  });
}

// ── Submit ────────────────────────────────────────────────────────────────────

export async function submitEOD() {
  // Hard guards
  if (isSubmittedToday()) {
    showToast('⚠️ Already submitted for today.', 'error');
    return;
  }
  if (!isEODUnlocked()) {
    showToast('🔒 Complete 80% of tasks or wait until 5 PM.', 'error');
    return;
  }
  if (!STATE.eod.showed) {
    showToast('Please select if you showed up today.', 'error');
    return;
  }
  if (STATE.eod.effort === 0) {
    showToast('Please rate your effort level.', 'error');
    return;
  }

  const notes    = document.getElementById('eod-notes')?.value?.trim() || '';
  const { pct }  = getOverallProgress();

  const payload = {
    showed:         STATE.eod.showed,
    effort:         STATE.eod.effort,
    notes,
    tasksCompleted: pct,
    phase:          STATE.phase,
  };

  try {
    const entry = await api.history.submit(payload);

    // Store — deduplicated by date
    STATE.history = STATE.history.filter(h => h.date !== todayKey());
    STATE.history.push(entry);

    _showBody();
    _showSubmittedValues(entry);
    _freezeForm();
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

// ── Listeners ─────────────────────────────────────────────────────────────────

export function attachEODListeners() {
  document.getElementById('eod-yes')?.addEventListener('click', () => {
    if (isSubmittedToday() || !isEODUnlocked()) return;
    STATE.eod.showed = 'yes';
    document.getElementById('eod-yes')?.classList.add('selected-yes');
    document.getElementById('eod-no')?.classList.remove('selected-no');
  });

  document.getElementById('eod-no')?.addEventListener('click', () => {
    if (isSubmittedToday() || !isEODUnlocked()) return;
    STATE.eod.showed = 'no';
    document.getElementById('eod-no')?.classList.add('selected-no');
    document.getElementById('eod-yes')?.classList.remove('selected-yes');
  });

  document.querySelectorAll('.star-btn').forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      if (isSubmittedToday() || !isEODUnlocked()) return;
      STATE.eod.effort = parseInt(btn.dataset.val);
      document.querySelectorAll('.star-btn').forEach((b, i) => {
        b.classList.toggle('active', i <= idx);
      });
    });

    btn.addEventListener('mouseenter', () => {
      if (isSubmittedToday()) return;
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

  // React to progress updates from blocks.js (via custom event)
  window.addEventListener('everyday:progress', updateEODLockState);
}
