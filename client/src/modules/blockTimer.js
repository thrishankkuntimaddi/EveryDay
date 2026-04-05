/**
 * blockTimer.js — Block time management and task locking
 *
 * Each block has a `time` string like "04:00 – 08:00".
 * Rules:
 *  - Block tasks are LOCKED (cannot be checked) until the block end time has passed.
 *  - Exception: the CURRENT block (started but not ended) allows task marking.
 *  - After 12AM the day resets; after EOD submission tasks lock until 4AM (morning block start).
 *  - A countdown runs inside each block header from block start → block end, then freezes at 0.
 */

import { BLOCKS } from './data.js';

// ── Time helpers ──────────────────────────────────────────────────────────────

/** Parse "HH:MM" → total minutes since midnight */
export function parseTime(str) {
  const [h, m] = (str || '00:00').split(':').map(Number);
  return h * 60 + m;
}

/** Parse block.time → { startMin, endMin } */
export function getBlockRange(block) {
  const parts = (block.time || '').split(/\s*[–-]\s*/);
  return {
    startMin: parseTime((parts[0] || '00:00').trim()),
    endMin:   parseTime((parts[1] || '00:00').trim()),
  };
}

/** Current minutes since midnight (local time) */
export function nowMinutes() {
  const n = new Date();
  return n.getHours() * 60 + n.getMinutes();
}

/** Return seconds remaining until blockEndMin from now (0 if past) */
export function secondsUntilBlockEnd(block) {
  const { endMin } = getBlockRange(block);
  const nowSec  = new Date().getHours() * 3600 + new Date().getMinutes() * 60 + new Date().getSeconds();
  const endSec  = endMin * 60;
  return Math.max(0, endSec - nowSec);
}

/** Return seconds until block starts */
export function secondsUntilBlockStart(block) {
  const { startMin } = getBlockRange(block);
  const nowSec  = new Date().getHours() * 3600 + new Date().getMinutes() * 60 + new Date().getSeconds();
  const startSec = startMin * 60;
  return Math.max(0, startSec - nowSec);
}

// ── Block status ──────────────────────────────────────────────────────────────

/**
 * Returns one of:
 *   'upcoming'  — block hasn't started yet
 *   'active'    — block is currently in progress
 *   'past'      — block end time has passed → tasks are markable
 */
export function getBlockStatus(block) {
  const { startMin, endMin } = getBlockRange(block);
  const now = nowMinutes();
  if (now < startMin) return 'upcoming';
  if (now < endMin)   return 'active';
  return 'past';
}

/** True if tasks in this block can be checked/unchecked right now.
 *
 * Marking window:
 *  - Upcoming (before block start): LOCKED — not started yet
 *  - Active (start → end):          LOCKED — you're executing, mark after
 *  - Past (after end):              OPEN all day until midnight
 *    (EOD lock is handled separately in toggleTask via STATE.eodLocked)
 */
export function isBlockMarkable(block) {
  const { endMin } = getBlockRange(block);
  const now = nowMinutes();

  // Block must have ended before tasks can be marked
  if (now < endMin) return false;

  // Once the block is past its end time, it stays open all day until midnight.
  // The EOD lock (STATE.eodLocked) is enforced separately in toggleTask.
  return true;
}

// ── Countdown formatting ──────────────────────────────────────────────────────

export function formatCountdown(totalSeconds) {
  if (totalSeconds <= 0) return 'DONE';
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  if (h > 0) return `${h}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`;
  if (m > 0) return `${m}m ${String(s).padStart(2, '0')}s`;
  return `${s}s`;
}

// ── Live countdown ticker ─────────────────────────────────────────────────────

let _timerHandle = null;

export function startBlockCountdowns() {
  if (_timerHandle) clearInterval(_timerHandle);
  _tick(); // immediate first render
  _timerHandle = setInterval(_tick, 1000);
}

export function stopBlockCountdowns() {
  if (_timerHandle) clearInterval(_timerHandle);
  _timerHandle = null;
}

function _tick() {
  BLOCKS.forEach(block => {
    const status   = getBlockStatus(block);
    const markable = isBlockMarkable(block);

    // Update countdown element
    const cdEl = document.getElementById(`block-cd-${block.id}`);
    if (cdEl) {
      if (status === 'upcoming') {
        const secsLeft = secondsUntilBlockStart(block);
        cdEl.textContent = `Starts in ${formatCountdown(secsLeft)}`;
        cdEl.className = 'block-countdown countdown-upcoming';
      } else if (status === 'active') {
        const secsLeft = secondsUntilBlockEnd(block);
        cdEl.textContent = `${formatCountdown(secsLeft)} left`;
        cdEl.className = 'block-countdown countdown-active';
      } else {
        // Past block — open for marking all day
        cdEl.textContent = 'Mark tasks ✎';
        cdEl.className = 'block-countdown countdown-done';
      }
    }

    // Update lock state on task items
    block.tasks.forEach(task => {
      const taskEl = document.getElementById(`task-${task.id}`);
      if (!taskEl) return;
      if (markable) {
        taskEl.classList.remove('task-locked');
        taskEl.removeAttribute('data-locked');
      } else {
        taskEl.classList.add('task-locked');
        taskEl.setAttribute('data-locked', 'true');
      }
    });

    // Update block card status class
    const card = document.getElementById(`block-card-${block.id}`);
    if (card) {
      card.classList.remove('block-status-upcoming', 'block-status-active', 'block-status-past', 'block-status-locked');
      card.classList.add(`block-status-${status}`);
    }
  });
}
