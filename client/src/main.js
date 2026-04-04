/**
 * main.js — EveryDay Client Entry Point
 * ======================================
 * Boots the application by:
 *  1. Calling server to check for new day + update streak
 *  2. Loading all state (tasks, settings, history, phase) from server
 *  3. Rendering UI
 *  4. Attaching all event listeners
 *
 * All server calls go through src/api/api.js
 * All rendering is done by domain modules in src/modules/
 */

import './style.css';
import api, { checkServerAvailability, isServerAvailable } from './api/api.js';
import { STATE } from './modules/state.js';
import { showToast } from './utils/toast.js';

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

import { BLOCKS } from './modules/data.js';
import { loadCustomPlan, enterEditMode, saveEditMode, exitEditMode } from './modules/planEditor.js';
import { renderEOD, attachEODListeners }         from './modules/eod.js';
import { renderHistory }                          from './modules/history.js';
import { renderProgression }                      from './modules/progression.js';
import { renderSettings, attachSettingsListeners } from './modules/settings.js';
import { openFocusMode, closeFocusMode, startTimer, pauseTimer, resetTimer } from './modules/focusMode.js';
import { requestNotifications, scheduleReminders } from './modules/notifications.js';

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

  // Focus mode toggle (header button)
  document.getElementById('focus-mode-toggle')?.addEventListener('click', () => {
    const first = BLOCKS.find(b => {
      const { total, done } = getBlockProgress(b);
      return done < total;
    }) || BLOCKS[0];
    openFocusMode(first.id);
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

  // Settings listeners
  attachSettingsListeners();
}

// ── Loading / Error UI ────────────────────────────────────────────────────────

function showLoadingBanner(show) {
  let banner = document.getElementById('loading-banner');
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'loading-banner';
    banner.className = 'loading-banner';
    banner.innerHTML = `
      <div class="loading-spinner"></div>
      <span>Connecting to server…</span>
    `;
    document.body.prepend(banner);
  }
  banner.classList.toggle('visible', show);
}

function showOfflineWarning(show) {
  let warn = document.getElementById('offline-warning');
  if (!warn) {
    warn = document.createElement('div');
    warn.id = 'offline-warning';
    warn.className = 'offline-warning';
    // Check if running on GitHub Pages or similar (no server)
    const isStaticHost = window.location.hostname.includes('github.io') ||
                         window.location.protocol === 'file:';
    const msg = isStaticHost
      ? '📦 Static mode — data saved to this browser only.'
      : '⚠️ Server offline — changes saved locally in this browser.';
    warn.innerHTML = `
      <span class="offline-warning-text">${msg}</span>
      <button class="offline-warning-close" aria-label="Dismiss" title="Dismiss">&times;</button>
    `;
    warn.querySelector('.offline-warning-close').addEventListener('click', () => {
      warn.classList.remove('visible');
      setTimeout(() => warn.remove(), 350);
    });
    document.body.prepend(warn);
  }
  warn.classList.toggle('visible', show);
}


// ── Boot Sequence ─────────────────────────────────────────────────────────────

async function boot() {
  showLoadingBanner(true);

  // 1. Probe server — sets internal availability flag in api.js
  const serverUp = await checkServerAvailability();

  if (!serverUp) {
    console.info('[EveryDay] Server not reachable — running in localStorage mode.');
    showOfflineWarning(true);
    STATE.serverError = true;
  } else {
    showOfflineWarning(false);
  }

  try {
    // 2. Check for new day + update streak (works in both modes)
    const streakResult = await api.streak.update();
    STATE.streak = streakResult.streak;

    // 3. Load all state in parallel (server or localStorage, api.js handles it)
    const [tasksData, historyData, settingsData, phaseData] = await Promise.all([
      api.tasks.getToday(),
      api.history.getAll(),
      api.settings.get(),
      api.settings.getPhase(),
    ]);

    STATE.tasks    = tasksData.tasks || {};
    STATE.history  = historyData || [];
    STATE.settings = settingsData || { name: '', goal: '', reminders: {} };
    STATE.phase    = phaseData.phase || 'stabilization';

  } catch (err) {
    console.error('[EveryDay] Boot error:', err.message);
  }

  showLoadingBanner(false);

  // 3b. Load any user-customised plan from localStorage (overrides default BLOCKS)
  loadCustomPlan();

  // 4. Render UI (works even if server is down)
  updateTodayDate();
  renderBlocks();
  updateMasterProgress();
  updateHeaderStreak();
  updatePhaseBadge();
  renderEOD();

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

  console.log('[EveryDay] Booted. Phase:', STATE.phase, '| Streak:', STATE.streak.count);
}

// ── Run when DOM ready ────────────────────────────────────────────────────────
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
