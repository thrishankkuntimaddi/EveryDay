/**
 * eod.js — End of Day Reflection module.
 *
 * UNLOCK CONDITIONS (either/or):
 *   • Current time ≥ 17:00 (5 PM)  OR  task completion ≥ 80%
 *
 * ONE SUBMISSION PER DAY — no re-editing after save.
 *
 * After submission: tasks lock until 4AM (morning block start).
 * Plan for Tomorrow: user can optionally pre-plan tomorrow's tasks.
 */

import { STATE } from './state.js';
import { getOverallProgress } from './blocks.js';
import { updateHeaderStreak } from './header.js';
import { collectAndSaveTomorrowPlan } from './tomorrowPlan.js';
import api from '../api/api.js';
import { showToast } from '../utils/toast.js';
import { todayKey } from '../utils/date.js';
import { getCached, patchUserData } from '../lib/db.js';

// ── Unlock conditions ─────────────────────────────────────────────────────────

function isAfter5PM() {
  return new Date().getHours() >= 17;
}

function isAfter9PM() {
  return new Date().getHours() >= 21;
}

/** EOD lock clears at 4AM — reads from Firestore cache, clears via patchUserData. */
export function checkAndClearEODLock() {
  const h = new Date().getHours();
  if (h >= 4) {
    STATE.eodLocked = false;
    patchUserData({ eodLocked: null }).catch(() => {});
  }
}

function isEODUnlocked() {
  const { pct } = getOverallProgress();
  return isAfter5PM() || pct >= 80;
}

function isSubmittedToday() {
  return STATE.history.some(h => h.date === todayKey());
}

// ── Auto-suggest rating based on performance ──────────────────────────────────

function _autoSuggestRating(pct) {
  if (pct >= 95) return { effort: 5, showed: 'yes' };
  if (pct >= 80) return { effort: 4, showed: 'yes' };
  if (pct >= 60) return { effort: 3, showed: 'yes' };
  if (pct >= 40) return { effort: 2, showed: 'yes' };
  if (pct >= 20) return { effort: 1, showed: 'yes' };
  return { effort: 1, showed: 'no' };
}

function _buildAutoSuggestNote(pct) {
  if (pct >= 95) return 'Outstanding execution today! Every block crushed. 🔥';
  if (pct >= 80) return 'Solid day. You showed up and delivered. Keep the momentum. 💪';
  if (pct >= 60) return 'Good effort — more than half the battle won. Push harder tomorrow.';
  if (pct >= 40) return 'Partial execution. Identify what blocked you and fix it tomorrow.';
  if (pct >= 20) return 'Rough day. Rest, reset, and come back stronger.';
  return 'Missed most tasks. Reflect on what happened and recommit.';
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
    _applyAutoSuggestion(); // pre-fill based on current performance
  } else {
    _showLock();
  }
}


// ── Auto-suggestion (pre-fill before user edits) ──────────────────────────────

function _applyAutoSuggestion() {
  const { pct } = getOverallProgress();
  const { effort, showed } = _autoSuggestRating(pct);
  const suggestedNote = _buildAutoSuggestNote(pct);

  // Pre-fill STATE
  STATE.eod.effort = effort;
  STATE.eod.showed = showed;

  // Update UI
  _renderStars(effort);

  const yesBtn = document.getElementById('eod-yes');
  const noBtn  = document.getElementById('eod-no');
  if (yesBtn && noBtn) {
    yesBtn.classList.toggle('selected-yes', showed === 'yes');
    noBtn.classList.toggle('selected-no',   showed === 'no');
  }

  // Pre-fill notes with suggestion (editable)
  const notes = document.getElementById('eod-notes');
  if (notes && !notes.value) {
    notes.value = suggestedNote;
    notes.dataset.autoFilled = 'true';
  }

  // Show suggestion badge
  const badge = document.getElementById('eod-suggestion-badge');
  if (badge) {
    badge.hidden = false;
    badge.textContent = `✨ Auto-suggested based on ${pct}% completion — edit freely`;
  }
}

function _renderStars(count) {
  document.querySelectorAll('.star-btn').forEach((b, i) => {
    b.classList.toggle('active', i < count);
    b.style.color = i < count ? 'var(--accent-amber)' : '';
  });
}

// ── Called reactively when progress changes (via 'everyday:progress' event) ───

export function updateEODLockState() {
  if (isSubmittedToday()) return;
  if (isEODUnlocked()) {
    _hideLock();
    _applyAutoSuggestion();
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

  _renderStars(entry.effort);

  const notes = document.getElementById('eod-notes');
  if (notes) {
    notes.value    = entry.notes || '';
    notes.readOnly = true;
  }

  // Hide plan-tomorrow section if already submitted
  const planSection = document.getElementById('eod-plan-tomorrow-section');
  if (planSection) planSection.hidden = true;
}

function _freezeForm() {
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

  const sugBadge = document.getElementById('eod-suggestion-badge');
  if (sugBadge) sugBadge.hidden = true;

  const notes = document.getElementById('eod-notes');
  if (notes) {
    notes.value    = '';
    notes.readOnly = false;
    notes.dataset.autoFilled = '';
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

  // Reset showed/effort
  STATE.eod.showed = null;
  STATE.eod.effort = 0;
  _renderStars(0);

  document.getElementById('eod-yes')?.classList.remove('selected-yes');
  document.getElementById('eod-no')?.classList.remove('selected-no');

  // Show plan tomorrow section
  const planSection = document.getElementById('eod-plan-tomorrow-section');
  if (planSection) planSection.hidden = false;
}

// (Plan for Tomorrow persistence — delegated to tomorrowPlan.js)
export function loadPlanForTomorrow() {
  return getCached('planTomorrow', null);
}


// ── Submit ────────────────────────────────────────────────────────────────────

export async function submitEOD() {
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

  const notes   = document.getElementById('eod-notes')?.value?.trim() || '';
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

    // Handle Plan for Tomorrow — delegated to tomorrowPlan.js
    const hasPlan = collectAndSaveTomorrowPlan();
    if (hasPlan) showToast("📅 Tomorrow's plan saved!", 'success');

    // Lock the day — persisted to Firestore; unlocks at 4AM
    STATE.eodLocked = true;
    patchUserData({ eodLocked: todayKey() }).catch(() => {});

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
      _renderStars(STATE.eod.effort);
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

  // Clear the auto-filled placeholder when user starts typing
  document.getElementById('eod-notes')?.addEventListener('focus', (e) => {
    if (e.target.dataset.autoFilled === 'true') {
      e.target.select(); // Select all so user can easily replace
    }
  });

  // React to progress updates from blocks.js (via custom event)
  window.addEventListener('everyday:progress', (e) => {
    if (!isSubmittedToday()) updateEODLockState();
  });
}
