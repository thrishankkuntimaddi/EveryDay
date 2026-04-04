/**
 * focusMode.js — Focus mode overlay with adjustable Pomodoro timer.
 *
 * Timer is now user-configurable (not fixed at 25:00).
 */

import { STATE } from './state.js';
import { BLOCKS } from './data.js';
import { toggleTask } from './blocks.js';
import { showToast } from '../utils/toast.js';
import { isBlockMarkable } from './blockTimer.js';

const DEFAULT_MINUTES = 25;

export function openFocusMode(blockId) {
  const block = BLOCKS.find(b => b.id === blockId);
  if (!block) return;

  STATE.focusBlock = blockId;

  const overlay  = document.getElementById('focus-overlay');
  const titleEl  = document.getElementById('focus-block-title');
  const tasksEl  = document.getElementById('focus-tasks');

  titleEl.textContent = `${block.icon} ${block.name}`;

  const markable = isBlockMarkable(block);

  tasksEl.innerHTML = block.tasks.map(task => {
    const done   = !!STATE.tasks[task.id];
    const locked = !markable;
    return `
      <div class="task-item${done ? ' done' : ''}${locked ? ' task-locked' : ''}"
           id="focus-task-${task.id}"
           data-task="${task.id}"
           role="checkbox"
           aria-checked="${done}"
           tabindex="0">
        <div class="custom-checkbox"></div>
        <span class="task-label">${task.label}</span>
        ${locked ? '<span class="task-lock-icon" title="Block not started yet">🔒</span>' : ''}
      </div>
    `;
  }).join('');

  tasksEl.querySelectorAll('.task-item').forEach(item => {
    const handleToggle = async () => {
      await toggleTask(item.dataset.task);
      const focusItem = document.getElementById(`focus-task-${item.dataset.task}`);
      if (focusItem) {
        focusItem.classList.toggle('done', !!STATE.tasks[item.dataset.task]);
        focusItem.setAttribute('aria-checked', !!STATE.tasks[item.dataset.task]);
      }
    };
    item.addEventListener('click', handleToggle);
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleToggle(); }
    });
  });

  resetTimer();
  overlay.hidden = false;
  document.body.style.overflow = 'hidden';
}

export function closeFocusMode() {
  const overlay = document.getElementById('focus-overlay');
  overlay.hidden = true;
  document.body.style.overflow = '';
  STATE.focusBlock = null;
  stopTimer();
}

// ── Pomodoro Timer ────────────────────────────────────────────────────────────

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export function startTimer() {
  if (STATE.timerRunning) return;
  STATE.timerRunning = true;

  const startBtn = document.getElementById('timer-start');
  if (startBtn) startBtn.textContent = '⏸ Pause';

  // Lock the timer input while running
  const timerInput = document.getElementById('focus-timer-input');
  if (timerInput) timerInput.disabled = true;

  STATE.timerInterval = setInterval(() => {
    if (STATE.timerSeconds <= 0) {
      stopTimer();
      showToast('⏰ Focus session complete! Time to take a break.', 'success');
      // Play a subtle notification sound if possible
      try { new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAA').play(); } catch {}
      return;
    }
    STATE.timerSeconds--;
    const timerEl = document.getElementById('focus-timer');
    if (timerEl) timerEl.textContent = formatTime(STATE.timerSeconds);
    _updateTimerRing();
  }, 1000);
}

export function pauseTimer() {
  clearInterval(STATE.timerInterval);
  STATE.timerRunning = false;
  const startBtn = document.getElementById('timer-start');
  if (startBtn) startBtn.textContent = '▶ Start';

  const timerInput = document.getElementById('focus-timer-input');
  if (timerInput) timerInput.disabled = false;
}

export function resetTimer() {
  pauseTimer();

  // Read custom duration from input
  const timerInput = document.getElementById('focus-timer-input');
  const minutes = timerInput ? Math.max(1, Math.min(120, parseInt(timerInput.value) || DEFAULT_MINUTES)) : DEFAULT_MINUTES;

  STATE.timerSeconds = minutes * 60;
  STATE.timerTotalSeconds = STATE.timerSeconds;

  const timerEl = document.getElementById('focus-timer');
  if (timerEl) timerEl.textContent = formatTime(STATE.timerSeconds);
  _updateTimerRing();
}

export function stopTimer() {
  pauseTimer();
}

export function attachTimerInputListener() {
  const timerInput = document.getElementById('focus-timer-input');
  if (!timerInput) return;

  timerInput.addEventListener('change', () => {
    if (!STATE.timerRunning) resetTimer();
  });

  timerInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); resetTimer(); }
  });
}

// ── Timer Ring (SVG progress) ─────────────────────────────────────────────────

function _updateTimerRing() {
  const ring = document.getElementById('focus-timer-ring');
  if (!ring) return;

  const total = STATE.timerTotalSeconds || (DEFAULT_MINUTES * 60);
  const pct   = STATE.timerSeconds / total;
  const CIRCUMFERENCE = 2 * Math.PI * 54; // r=54

  ring.style.strokeDashoffset = CIRCUMFERENCE * (1 - pct);
}
