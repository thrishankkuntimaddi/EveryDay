/**
 * main.js — EveryDay Client Entry Point
 * ======================================
 * Boots the application by:
 *  1. Updating streak for today
 *  2. Loading all state (tasks, settings, history, phase) from Firestore cache
 *  3. Rendering UI
 *  4. Attaching all event listeners
 *
 * All data flows through Firestore via src/lib/db.js
 * All rendering is done by domain modules in src/modules/
 *
 * Auth gate + Firestore sync:
 *  - listenToAuth()      subscribes to Firebase session state
 *  - loadUserData()      hydrates the Firestore cache before boot
 *  - listenToUserData()  real-time cross-device sync after boot
 */

import './style.css';
import api, { forceFirestoreMode } from './api/api.js';
import { STATE } from './modules/state.js';
import { showToast } from './utils/toast.js';
import { todayKey } from './utils/date.js';
import { listenToAuth } from './lib/auth.js';
import { mountLoginScreen, unmountLoginScreen, showVerifyEmailScreen } from './modules/login.js';
import { loadUserData, listenToUserData, stopListening, getCached, patchUserData } from './lib/db.js';
import { BLOCKS } from './modules/data.js';

import {
  renderBlocks,
  updateMasterProgress,
  applyMinimumMode,
  openFirstBlock,
  getBlockProgress,
} from './modules/blocks.js';

import {
  updateHeaderStreak,
  updatePhaseBadge,
  updateTodayDate,
} from './modules/header.js';

import { loadCustomPlan, enterEditMode, saveEditMode, exitEditMode } from './modules/planEditor.js';
import { renderEOD, attachEODListeners, checkAndClearEODLock } from './modules/eod.js';
import { renderTomorrowPlan, resetTomorrowPlan } from './modules/tomorrowPlan.js';
import { renderHistory }                          from './modules/history.js';
import { renderProgression, renderDashboardPhasePanel } from './modules/progression.js';
import { renderSettings, attachSettingsListeners } from './modules/settings.js';
import { openFocusMode, closeFocusMode, startTimer, pauseTimer, resetTimer, attachTimerInputListener } from './modules/focusMode.js';
import { requestNotifications, scheduleReminders } from './modules/notifications.js';
import { startBlockCountdowns, getBlockStatus } from './modules/blockTimer.js';
import { initDragSort } from './modules/dragSort.js';
import { renderImmediate } from './modules/immediate.js';

// ── View Navigation ───────────────────────────────────────────────────────────

function switchView(viewId) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.mobile-nav-btn').forEach(b => b.classList.remove('active'));

  const view    = document.getElementById(`view-${viewId}`);
  const tab     = document.getElementById(`tab-${viewId}`);
  const mobTab  = document.getElementById(`mob-tab-${viewId}`);

  if (view)   view.classList.add('active');
  if (tab)    tab.classList.add('active');
  if (mobTab) mobTab.classList.add('active');

  STATE.currentView = viewId;

  // Close phase panel when leaving dashboard
  if (viewId !== 'dashboard') {
    const panel = document.getElementById('phase-panel');
    if (panel) panel.hidden = true;
  }

  if (viewId === 'immediate')   renderImmediate();
  if (viewId === 'history')     renderHistory();
  if (viewId === 'progression') renderProgression();
  if (viewId === 'settings')    renderSettings();
}

// ── Global Event Listeners ────────────────────────────────────────────────────

function attachGlobalListeners() {
  // Nav tabs (desktop)
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => switchView(tab.dataset.view));
  });

  // Nav buttons (mobile bottom bar)
  document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => switchView(btn.dataset.view));
  });

  // Focus mode toggle — syncs with current time window
  // Priority: active (in progress now) → upcoming (next to start) → first incomplete → first block
  document.getElementById('focus-mode-toggle')?.addEventListener('click', () => {
    const activeBlock   = BLOCKS.find(b => getBlockStatus(b) === 'active');
    const upcomingBlock = BLOCKS.find(b => getBlockStatus(b) === 'upcoming');
    const incompleteBlock = BLOCKS.find(b => {
      const { total, done } = getBlockProgress(b);
      return done < total;
    });
    const target = activeBlock || upcomingBlock || incompleteBlock || BLOCKS[0];
    openFocusMode(target.id);
  });


  // Focus overlay exit
  document.getElementById('focus-exit-btn')?.addEventListener('click', closeFocusMode);

  // Timer controls
  document.getElementById('timer-start')?.addEventListener('click', () => {
    if (STATE.timerRunning) pauseTimer();
    else startTimer();
  });
  document.getElementById('timer-reset')?.addEventListener('click', resetTimer);

  // Minimum mode toggle
  document.getElementById('min-mode-toggle')?.addEventListener('change', e => {
    STATE.minimumMode = e.target.checked;
    applyMinimumMode();
    showToast(STATE.minimumMode
      ? '🛡 Minimum Mode ON — essential tasks shown'
      : 'Full mode restored'
    );
  });

  // Edit Plan / Save / Cancel inline controls
  document.getElementById('edit-plan-btn')?.addEventListener('click', enterEditMode);
  document.getElementById('inline-save-btn')?.addEventListener('click', saveEditMode);
  document.getElementById('inline-cancel-btn')?.addEventListener('click', exitEditMode);

  // Plan for Tomorrow header button
  document.getElementById('plan-tomorrow-btn')?.addEventListener('click', () => {
    switchView('dashboard');
    // Small delay to ensure the view is active before scrolling
    setTimeout(() => {
      const card = document.getElementById('tomorrow-plan-card');
      if (!card) return;
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Pulse animation to draw the eye
      card.classList.remove('tmp-highlight');
      void card.offsetWidth; // reflow to restart animation
      card.classList.add('tmp-highlight');
    }, 80);
  });

  // Notification button
  document.getElementById('notify-btn')?.addEventListener('click', requestNotifications);

  // Keyboard: Escape to close focus
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !document.getElementById('focus-overlay')?.hidden) {
      closeFocusMode();
    }
  });

  // EOD listeners
  attachEODListeners();

  // Timer input listener (adjustable focus duration)
  attachTimerInputListener();

  // Settings listeners
  attachSettingsListeners();

  // Re-init drag sort whenever blocks are re-rendered
  window.addEventListener('everyday:blocksRendered', () => initDragSort());

  // Hard Refresh — settings.js fetches fresh Firestore data + updates STATE,
  // then fires this event so main.js (which owns all render functions) can re-render.
  window.addEventListener('everyday:hardRefresh', () => {
    // Reload the custom block plan from the fresh cache
    loadCustomPlan();

    // Always update the persistent header elements
    updateHeaderStreak();
    updatePhaseBadge();

    // Re-render whichever view is currently active
    switch (STATE.currentView) {
      case 'dashboard':
        renderBlocks();
        updateMasterProgress();
        renderEOD();
        renderTomorrowPlan();
        break;
      case 'immediate':
        renderImmediate();
        break;
      case 'history':
        renderHistory();
        break;
      case 'settings':
        renderSettings();
        break;
    }

    console.log('[EveryDay] 🔄 Hard Refresh complete — UI re-rendered from fresh Firestore data.');
  });

  // Phase panel toggle (click #metric-phase card)
  const phaseMetric = document.getElementById('metric-phase');
  const phasePanel  = document.getElementById('phase-panel');
  const phasePanelClose = document.getElementById('phase-panel-close');

  function togglePhasePanel() {
    if (!phasePanel) return;
    const isHidden = phasePanel.hidden;
    phasePanel.hidden = !isHidden;
    if (!isHidden) return; // closing — no render needed
    renderDashboardPhasePanel();
    // Smooth scroll to panel
    setTimeout(() => phasePanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
  }

  phaseMetric?.addEventListener('click', togglePhasePanel);
  phaseMetric?.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); togglePhasePanel(); }
  });
  phasePanelClose?.addEventListener('click', () => {
    if (phasePanel) phasePanel.hidden = true;
  });

  // Collapse / Expand All blocks
  const collapseBtn   = document.getElementById('collapse-all-btn');
  const collapseLabel = document.getElementById('collapse-label');
  const collapseIcon  = document.getElementById('collapse-icon');
  let _allCollapsed = false;

  collapseBtn?.addEventListener('click', () => {
    _allCollapsed = !_allCollapsed;

    document.querySelectorAll('.block-card').forEach(card => {
      const blockId = card.id.replace('block-card-', '');
      const header  = document.getElementById(`block-header-${blockId}`);
      card.classList.toggle('expanded', !_allCollapsed);
      header?.setAttribute('aria-expanded', String(!_allCollapsed));

      // Keep UI state Set in sync so Firestore re-renders honour this choice
      if (_allCollapsed) {
        STATE.expandedBlocks.delete(blockId);
      } else {
        STATE.expandedBlocks.add(blockId);
      }
    });

    // Update button appearance
    collapseLabel.textContent = _allCollapsed ? 'Expand All' : 'Collapse All';
    collapseIcon.querySelector('polyline').setAttribute(
      'points', _allCollapsed ? '6 9 12 15 18 9' : '18 15 12 9 6 15'
    );
  });
}

// ── Boot Sequence ─────────────────────────────────────────────────────────────

async function boot() {
  try {
    // 1. Update streak for today
    const streakResult = await api.streak.update();
    STATE.streak = streakResult.streak;

    // 2. Load all state from Firestore cache (via api.js)
    const [tasksData, historyData, settingsData, phaseData] = await Promise.all([
      api.tasks.getToday(),
      api.history.getAll(),
      api.settings.get(),
      api.settings.getPhase(),
    ]);

    STATE.tasks    = tasksData.tasks || {};
    STATE.history  = historyData    || [];
    STATE.settings = settingsData   || { name: '', goal: '', reminders: {} };
    STATE.phase    = phaseData.phase || 'stabilization';

  } catch (err) {
    console.error('[EveryDay] Boot error:', err.message);
  }

  // 3c. Restore EOD lock state from Firestore cache
  const savedEodLock = getCached('eodLocked', null);
  if (savedEodLock && savedEodLock === todayKey()) {
    // EOD was submitted today — check if 4AM has passed to unlock
    checkAndClearEODLock();
    if (new Date().getHours() < 4) {
      STATE.eodLocked = true;
    }
  } else {
    STATE.eodLocked = false;
  }

  // 3b. Load any user-customised plan from Firestore cache
  loadCustomPlan();

  // 4. Render UI (works even if server is down)
  updateTodayDate();
  renderBlocks();
  updateMasterProgress();
  updateHeaderStreak();
  updatePhaseBadge();
  renderEOD();
  renderTomorrowPlan(); // Standalone Plan for Tomorrow card

  // 4b. Init drag-and-drop reordering
  initDragSort();

  // Sync toggle UI to match state (minimumMode defaults false, but be explicit)
  const minToggle = document.getElementById('min-mode-toggle');
  if (minToggle) minToggle.checked = STATE.minimumMode;

  // 5. Attach all listeners
  attachGlobalListeners();

  // 6. Open first block
  openFirstBlock();

  // 7. Schedule any saved notifications
  if ('Notification' in window && Notification.permission === 'granted') {
    STATE.notificationsEnabled = true;
    scheduleReminders();
  }

  // 8. Start block countdown timers (live lock/unlock state)
  startBlockCountdowns();

  console.log('[EveryDay] Booted. Phase:', STATE.phase, '| Streak:', STATE.streak.count);
}

// ── Auth Gate + Firestore Sync ───────────────────────────────────────────────────────

// ── Dev bypass ────────────────────────────────────────────────────────────────
// Email verification is SKIPPED on localhost so you can develop without
// waiting for Firebase emails. A loud console warning is printed instead.
// This flag is FALSE in production (any non-localhost hostname).
const IS_DEV = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

let _booted = false;

/**
 * _handleVerifyToken — validates the ?verify=TOKEN&uid=UID query params that
 * the Brevo email link injects. If valid, writes emailVerified=true to Firestore
 * and cleans the URL so the token isn't visible in the address bar.
 *
 * @param  {string}  uid — Firebase UID of the currently signed-in user
 * @returns {boolean}    true if the token was valid and the user is now verified
 */
async function _handleVerifyToken(uid) {
  const params   = new URLSearchParams(window.location.search);
  const token    = params.get('verify');
  const paramUid = params.get('uid');

  // Always clean the URL so the token is not visible in the address bar
  if (token) window.history.replaceState({}, '', window.location.pathname);

  if (!token || paramUid !== uid) return false;

  const storedToken    = getCached('verificationToken', null);
  const tokenCreatedAt = getCached('tokenCreatedAt', null);

  if (!storedToken || storedToken !== token) {
    console.warn('[EveryDay] Verification token mismatch or already used.');
    return false;
  }

  // Tokens expire after 24 h
  if (tokenCreatedAt) {
    const ageMs = Date.now() - new Date(tokenCreatedAt).getTime();
    if (ageMs > 24 * 60 * 60 * 1000) {
      console.warn('[EveryDay] Verification token expired (>24 h). Please resend.');
      return false;
    }
  }

  // ✅ Token is valid — mark user as verified in Firestore
  try {
    await patchUserData({ emailVerified: true, verificationToken: null, tokenCreatedAt: null });
    console.log('[EveryDay] ✅ Email verified via Brevo token!');
    return true;
  } catch (err) {
    console.error('[EveryDay] Failed to write emailVerified to Firestore:', err.message);
    return false;
  }
}

// Tracks the lastUpdated timestamp of the most recent data we've accepted.
// Used to reject stale onSnapshot echoes that arrive out-of-order.
let _lastKnownUpdate = null;

/**
 * Called when a remote Firestore update arrives (from another device).
 * Updates STATE and re-renders affected components.
 * Never fires for local writes (hasPendingWrites guard is in db.js).
 *
 * F2b — Latest-write-wins: if the remote timestamp is older than what we
 *        already have, skip the update to avoid stale overwrites.
 * F4  — Reminders: reschedule on this device if settings changed remotely.
 */
function _handleRemoteUpdate(data) {
  if (!_booted) return;

  // F2b — Reject only STRICTLY OLDER remote snapshots.
  if (data.lastUpdated && _lastKnownUpdate && data.lastUpdated < _lastKnownUpdate) {
    console.log('[EveryDay] ⏭ Skipping genuinely stale remote snapshot.');
    return;
  }
  _lastKnownUpdate = data.lastUpdated || _lastKnownUpdate;

  // ── Sync ALL Firestore fields into STATE ────────────────────────────────────────────
  // data.tasks is the full { "YYYY-MM-DD": { taskId: bool } } map.
  // STATE.tasks must only hold today's task map { taskId: bool }.
  const _today = todayKey();
  STATE.tasks        = (data.tasks && data.tasks[_today]) ? data.tasks[_today] : (STATE.tasks || {});
  STATE.streak       = data.streak       || STATE.streak;
  STATE.history      = data.history      || [];
  STATE.settings     = data.settings     || STATE.settings;
  STATE.phase        = data.phase        || STATE.phase;
  STATE.eodLocked    = data.eodLocked    || null;
  STATE.planTomorrow = data.planTomorrow || null;

  // Reload custom plan into BLOCKS if it changed on another device
  if (data.customPlan) {
    BLOCKS.length = 0;
    data.customPlan.forEach(b => BLOCKS.push(b));
  }

  // F4 — Reschedule reminders if settings changed remotely
  if (STATE.notificationsEnabled) scheduleReminders();

  // ── Always update header (visible on every view) ─────────────────────────────
  updateHeaderStreak();
  updatePhaseBadge();

  // ── Only re-render the view the user is currently looking at ─────────────────
  // Calling render on an inactive view wipes its DOM mid-edit and causes the
  // jarring "full refresh" effect. STATE is already updated — when the user
  // switches tabs the tab's render function will use the latest STATE.
  switch (STATE.currentView) {
    case 'dashboard':
      renderBlocks();
      updateMasterProgress();
      renderDashboardPhasePanel();
      renderEOD();
      renderTomorrowPlan(); // sync planTomorrow + BLOCKS changes from other devices
      break;
    case 'immediate':
      renderImmediate();
      break;
    case 'history':
      renderHistory();
      break;
    case 'settings':
      renderSettings();
      break;
  }

  console.log('[EveryDay] 🔄 Remote update applied from another device.');
}

/**
 * _bootWithSync — full startup sequence for a logged-in user.
 *
 * F1 — Two variants:
 *   _bootWithSync(uid)          → loads Firestore data then boots (used by auth gate
 *                                  when data hasn't been loaded yet — safety fallback).
 *   _bootWithSyncNoPrefetch(uid) → skips loadUserData because the auth gate already
 *                                  called it; avoids the double-read on every login.
 */
async function _bootWithSync(uid) {
  forceFirestoreMode();
  try {
    await loadUserData(uid);
  } catch (err) {
    console.warn('[EveryDay] Firestore pre-boot failed — continuing anyway:', err.message);
  }
  // Seed conflict guard with whatever lastUpdated we just loaded,
  // so the immediate onSnapshot boot-fire is never compared against null.
  _lastKnownUpdate = getCached('lastUpdated', null);
  await boot();
  listenToUserData(uid, _handleRemoteUpdate);
}

// F1 — Used by the normal auth gate path where loadUserData was already called.
async function _bootWithSyncNoPrefetch(uid) {
  forceFirestoreMode();
  // Data is already in _cache from the auth gate's loadUserData call — skip the fetch.
  // Seed conflict guard so the boot-time onSnapshot is not compared against null.
  _lastKnownUpdate = getCached('lastUpdated', null);
  await boot();
  listenToUserData(uid, _handleRemoteUpdate);
}

function initAuthGate() {
  mountLoginScreen();

  listenToAuth(async (user) => {
    if (user) {
      // ── Step 1: Load Firestore data (SINGLE call — F1 fix) ───────────────────
      // This is the ONLY loadUserData() call. _bootWithSyncNoPrefetch() below
      // skips the redundant second fetch that the old _bootWithSync() performed.
      forceFirestoreMode();
      try {
        await loadUserData(user.uid);
      } catch (e) {
        console.warn('[EveryDay] Pre-auth data load failed:', e.message);
      }

      // ── Step 2: Verify the user ───────────────────────────────────────────────
      // Accept EITHER Firebase's native flag OR our custom Firestore field
      // (set by _handleVerifyToken when the user clicks the Brevo email link).
      const firestoreVerified = getCached('emailVerified', false);
      const isVerified        = user.emailVerified || firestoreVerified;

      if (!isVerified) {
        // Check if the current URL carries a verification token from the email link
        const tokenHandled = await _handleVerifyToken(user.uid);

        if (!tokenHandled) {
          if (IS_DEV) {
            // ── DEV BYPASS: loud console warning, app still boots ────────────
            console.warn(
              '%c[EveryDay DEV] ⚠️  EMAIL VERIFICATION BYPASSED',
              'background:#7c3aed;color:#fff;padding:4px 10px;border-radius:4px;font-weight:700;font-size:13px'
            );
            console.warn(
              `[EveryDay DEV] User "${user.email}" is NOT verified.\n` +
              '  → Gate skipped on localhost — sign up fresh to get a Brevo email.\n' +
              '  → In production this blocks the user until they verify.'
            );
          } else {
            // ── PRODUCTION: block — show verify screen ────────────────────────
            unmountLoginScreen();
            showVerifyEmailScreen();
            return;
          }
        }
      }

      // ── Step 3: Boot the app ─────────────────────────────────────────────────
      unmountLoginScreen();

      if (!_booted) {
        _booted = true;
        // F1 — Use NoPrefetch variant: data is already in cache from Step 1 above.
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', () => _bootWithSyncNoPrefetch(user.uid));
        } else {
          await _bootWithSyncNoPrefetch(user.uid);
        }
      }
    } else {
      // Logged out — tear down all state to prevent cross-user data leaks
      stopListening();
      resetTomorrowPlan();         // clear _tDraft so next user starts blank
      _lastKnownUpdate = null;
      if (_booted) {
        _booted = false;
        location.reload();
      } else {
        mountLoginScreen();
      }
    }
  });
}

initAuthGate();
