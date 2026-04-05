/**
 * focusMode.js — Block-bound Focus Mode
 * ═══════════════════════════════════════════════════════════════
 * • Countdown tied to the block's actual end time (not a free timer)
 * • Browser Notification API — fires on start, midpoint, end
 * • Wake Lock API — keeps screen on during focus
 * • Browser tab title shows live countdown
 * • Keyboard: Escape to exit, Space to start/pause
 * • On exit: everything restored (title, wake lock, intervals)
 */

import { STATE } from './state.js';
import { BLOCKS } from './data.js';
import { toggleTask } from './blocks.js';
import { showToast } from '../utils/toast.js';
import { isBlockMarkable, getBlockStatus, getBlockRange } from './blockTimer.js';

// ── Module-level state ────────────────────────────────────────────────────────
let _interval       = null;  // setInterval handle
let _wakeLock       = null;  // WakeLockSentinel
let _origTitle      = document.title;
let _notifFired     = { start: false, mid: false };
let _activeBlockId  = null;

// ── Public API ────────────────────────────────────────────────────────────────

export function openFocusMode(blockId) {
  const block = BLOCKS.find(b => b.id === blockId);
  if (!block) return;

  _activeBlockId   = blockId;
  STATE.focusBlock = blockId;
  _notifFired      = { start: false, mid: false };

  // Request notification permission (non-blocking)
  _requestNotificationPermission();

  const overlay = document.getElementById('focus-overlay');
  const titleEl = document.getElementById('focus-block-title');
  const tasksEl = document.getElementById('focus-tasks');

  titleEl.textContent = `${block.icon} ${block.name}`;

  // ── Render tasks ──
  const markable  = isBlockMarkable(block);
  const blockStat = getBlockStatus(block);
  const locked    = (blockStat === 'upcoming' || blockStat === 'active');

  tasksEl.innerHTML = block.tasks.map(task => {
    const done = !!STATE.tasks[task.id];
    return `
      <div class="task-item${done ? ' done' : ''}${locked ? ' task-locked' : ''}"
           id="focus-task-${task.id}"
           data-task="${task.id}"
           role="checkbox"
           aria-checked="${done}"
           tabindex="0">
        <div class="custom-checkbox"></div>
        <span class="task-label">${task.label}</span>
        ${locked ? '<span class="task-lock-icon" title="Mark tasks after block ends">🔒</span>' : ''}
      </div>
    `;
  }).join('');

  tasksEl.querySelectorAll('.task-item').forEach(item => {
    const handleToggle = async () => {
      await toggleTask(item.dataset.task);
      const fi = document.getElementById(`focus-task-${item.dataset.task}`);
      if (fi) {
        fi.classList.toggle('done', !!STATE.tasks[item.dataset.task]);
        fi.setAttribute('aria-checked', !!STATE.tasks[item.dataset.task]);
      }
    };
    item.addEventListener('click', handleToggle);
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleToggle(); }
    });
  });

  // ── Build countdown UI ──
  _buildCountdownUI(block);

  // ── Acquire Wake Lock ──
  _acquireWakeLock();

  // ── Start live countdown interval ──
  _startCountdown(block);

  // ── Show overlay ──
  overlay.hidden = false;
  document.body.style.overflow = 'hidden';

  // ── Keyboard listener ──
  document.addEventListener('keydown', _onKeyDown);

  // ── Notification: block started ──
  _notify(
    `${block.icon} Focus Mode — ${block.name}`,
    `Block runs until ${_fmtEndTime(block)}. Stay locked in. 🎯`,
    'start'
  );
}

export function closeFocusMode() {
  const overlay = document.getElementById('focus-overlay');
  overlay.hidden = true;
  document.body.style.overflow = '';

  _cleanup();
}

// ── Cleanup ───────────────────────────────────────────────────────────────────

function _cleanup() {
  // Stop interval
  clearInterval(_interval);
  _interval = null;

  // Release wake lock
  if (_wakeLock) {
    _wakeLock.release().catch(() => {});
    _wakeLock = null;
  }

  // Restore tab title
  document.title = _origTitle;

  // Remove keyboard listener
  document.removeEventListener('keydown', _onKeyDown);

  STATE.focusBlock   = null;
  _activeBlockId     = null;
}

// ── Countdown UI builder ──────────────────────────────────────────────────────

function _buildCountdownUI(block) {
  const { startMin, endMin } = getBlockRange(block);
  const blockStatus          = getBlockStatus(block);
  const now                  = new Date();
  const endStr               = _fmtEndTime(block);
  const startStr             = _fmtMin(startMin);

  // Total block duration in seconds
  const totalBlockSecs = (endMin - startMin) * 60;

  // Seconds remaining until block end
  let secondsLeft;
  if (blockStatus === 'past') {
    secondsLeft = 0;
  } else {
    const endDate = new Date(now);
    endDate.setHours(Math.floor(endMin / 60), endMin % 60, 0, 0);
    secondsLeft = Math.max(0, Math.floor((endDate - now) / 1000));
  }

  // Store total block duration (not remaining) so bar shows position in block
  STATE.timerSeconds      = secondsLeft;
  STATE.timerTotalSeconds = totalBlockSecs || 1;

  // Elapsed pct = 0% at block start → 100% at block end
  const elapsedPct = Math.min(100, ((totalBlockSecs - secondsLeft) / totalBlockSecs) * 100);

  _renderCountdownUI(block, secondsLeft, endStr, startStr, elapsedPct);
}


function _renderCountdownUI(block, secondsLeft, endStr, startStr = 'Start', elapsedPct = 0) {
  const timerWrap = document.getElementById('focus-timer-wrap');
  if (!timerWrap) return;

  const isDone = getBlockStatus(block) === 'past';
  const pct    = isDone ? 100 : elapsedPct;

  timerWrap.innerHTML = `
    <div class="fm-countdown-block">

      <!-- End time pill -->
      <div class="fm-end-pill">
        ${isDone
          ? `<span class="fm-done-chip">✅ Block ended</span>`
          : `<span class="fm-end-chip">🏁 Ends at <strong>${endStr}</strong></span>`}
      </div>

      <!-- Big countdown digits -->
      <div class="fm-timer-display">
        <div id="focus-timer" class="fm-timer-digits ${isDone ? 'fm-timer-done' : ''}">${formatTime(secondsLeft)}</div>
        <div class="fm-timer-label">${isDone ? 'session ended' : 'remaining'}</div>
      </div>

      <!-- Progress bar: grows left→right as block elapses -->
      <div class="fm-bar-wrap">
        <div class="fm-bar-track">
          <div id="focus-progress-bar" class="fm-bar-fill" style="width:${pct.toFixed(1)}%"></div>
        </div>
        <div class="fm-bar-labels">
          <span class="fm-bar-start">${startStr}</span>
          <span class="fm-bar-end">${endStr}</span>
        </div>
      </div>

      <!-- DND badge -->
      <div class="fm-dnd-badge ${isDone ? 'fm-dnd-done' : ''}">
        ${isDone ? '🎉 Mark your tasks above!' : '🔕 Focus Active — Do Not Disturb'}
      </div>

    </div>
  `;
}




// ── Live countdown interval ───────────────────────────────────────────────────

function _startCountdown(block) {
  clearInterval(_interval);

  _interval = setInterval(() => {
    const { endMin } = getBlockRange(block);
    const now        = new Date();
    const endDate    = new Date(now);
    endDate.setHours(Math.floor(endMin / 60), endMin % 60, 0, 0);

    const secsLeft = Math.max(0, Math.floor((endDate - now) / 1000));
    STATE.timerSeconds = secsLeft;

    // Update countdown display
    const timerEl = document.getElementById('focus-timer');
    if (timerEl) timerEl.textContent = formatTime(secsLeft);
    _updateRing();

    // Update tab title
    if (_activeBlockId) {
      document.title = `${block.icon} ${formatTime(secsLeft)} — ${block.name}`;
    }

    // ── Midpoint notification ──────────────────────────────────────────────
    if (!_notifFired.mid && STATE.timerTotalSeconds > 0) {
      const pctDone = 1 - (secsLeft / STATE.timerTotalSeconds);
      if (pctDone >= 0.5) {
        _notify(
          `${block.icon} Halfway there — ${block.name}`,
          `${formatTime(secsLeft)} remaining in your focus block. Keep going! 💪`,
          'mid'
        );
        _notifFired.mid = true;
      }
    }

    // ── Block ended ────────────────────────────────────────────────────────
    if (secsLeft === 0 && !_notifFired.end) {
      _notifFired.end = true;
      clearInterval(_interval);
      _interval = null;

      // Update UI to "done" state
      const dndBadge = document.querySelector('.fm-dnd-badge');
      if (dndBadge) {
        dndBadge.classList.add('fm-dnd-done');
        dndBadge.textContent = '🎉 Block complete — mark your tasks!';
      }
      const endLabel = document.querySelector('.fm-block-end-label');
      if (endLabel) endLabel.innerHTML = `<span class="fm-done-label">✅ Block time ended — mark tasks above</span>`;

      // Release wake lock on end
      if (_wakeLock) { _wakeLock.release().catch(() => {}); _wakeLock = null; }

      // Restore tab title with done indicator
      document.title = `✅ Done — ${block.name}`;

      _notify(
        `⏰ Block complete — ${block.name}`,
        'Time\'s up! Head to your dashboard to mark your tasks. 📋',
        'end'
      );

      showToast(`⏰ ${block.name} is complete! Mark your tasks.`, 'success');
    }
  }, 1000);
}

// ── Ring progress update ──────────────────────────────────────────────────────

function _updateRing() {
  const bar = document.getElementById('focus-progress-bar');
  if (!bar || STATE.timerTotalSeconds <= 0) return;

  // Bar shows ELAPSED time (grows left→right)
  const elapsed = STATE.timerTotalSeconds - STATE.timerSeconds;
  const pct     = Math.min(100, Math.max(0, (elapsed / STATE.timerTotalSeconds) * 100));
  bar.style.width = pct.toFixed(2) + '%';

  // Shift color as the block nears its end (remaining time is low)
  const remainingPct = 100 - pct;
  if (remainingPct < 10) {
    bar.style.background = 'linear-gradient(90deg, #7c3aed, #f43f5e)';
  } else if (remainingPct < 25) {
    bar.style.background = 'linear-gradient(90deg, #7c3aed, #f59e0b)';
  } else {
    bar.style.background = '';  // default violet→cyan from CSS
  }
}




// ── Wake Lock ─────────────────────────────────────────────────────────────────

async function _acquireWakeLock() {
  if (!('wakeLock' in navigator)) return;
  try {
    _wakeLock = await navigator.wakeLock.request('screen');
    // Re-acquire if page visibility changes
    document.addEventListener('visibilitychange', async () => {
      if (_wakeLock !== null && document.visibilityState === 'visible') {
        try { _wakeLock = await navigator.wakeLock.request('screen'); } catch {}
      }
    }, { once: true });
  } catch {
    // Wake Lock not available — silent fail
  }
}

// ── Notifications ─────────────────────────────────────────────────────────────

async function _requestNotificationPermission() {
  if (!('Notification' in window)) return;
  if (Notification.permission === 'default') {
    await Notification.requestPermission();
  }
}

function _notify(title, body, key) {
  if (!('Notification' in window)) return;
  if (Notification.permission !== 'granted') return;
  if (key && _notifFired[key]) return;

  try {
    const n = new Notification(title, {
      body,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      tag: `everyday-focus-${key}`,
      silent: false,
    });
    n.onclick = () => { window.focus(); n.close(); };
    setTimeout(() => n.close(), 8000);
    if (key) _notifFired[key] = true;
  } catch {}
}

// ── Keyboard handler ──────────────────────────────────────────────────────────

function _onKeyDown(e) {
  if (e.key === 'Escape') {
    e.preventDefault();
    closeFocusMode();
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatTime(totalSeconds) {
  if (totalSeconds <= 0) return '00:00';
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function _fmtEndTime(block) {
  const { endMin } = getBlockRange(block);
  return _fmtMin(endMin);
}

function _fmtMin(totalMin) {
  const h      = Math.floor(totalMin / 60);
  const m      = totalMin % 60;
  const period = h < 12 ? 'AM' : 'PM';
  const h12    = h % 12 || 12;
  return `${h12}:${m.toString().padStart(2, '0')} ${period}`;
}


// ── Legacy exports (kept for compatibility) ───────────────────────────────────
export function startTimer()           { /* replaced by block-bound countdown */ }
export function pauseTimer()           { /* no-op */ }
export function resetTimer()           { /* no-op */ }
export function stopTimer()            { clearInterval(_interval); _interval = null; }
export function attachTimerInputListener() { /* no-op — input removed */ }
