/**
 * focusMode.js — Focus mode overlay and Pomodoro timer.
 */

import { STATE } from './state.js';
import { BLOCKS } from './data.js';
import { toggleTask } from './blocks.js';
import { showToast } from '../utils/toast.js';

export function openFocusMode(blockId) {
  const block = BLOCKS.find(b => b.id === blockId);
  if (!block) return;

  STATE.focusBlock = blockId;

  const overlay  = document.getElementById('focus-overlay');
  const titleEl  = document.getElementById('focus-block-title');
  const tasksEl  = document.getElementById('focus-tasks');

  titleEl.textContent = `${block.icon} ${block.name}`;

  tasksEl.innerHTML = block.tasks.map(task => {
    const done = !!STATE.tasks[task.id];
    return `
      <div class="task-item${done ? ' done' : ''}"
           id="focus-task-${task.id}"
           data-task="${task.id}"
           role="checkbox"
           aria-checked="${done}"
           tabindex="0">
        <div class="custom-checkbox"></div>
        <span class="task-label">${task.label}</span>
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

  STATE.timerInterval = setInterval(() => {
    if (STATE.timerSeconds <= 0) {
      stopTimer();
      showToast('⏰ Focus session complete! Time to take a break.', 'success');
      return;
    }
    STATE.timerSeconds--;
    const timerEl = document.getElementById('focus-timer');
    if (timerEl) timerEl.textContent = formatTime(STATE.timerSeconds);
  }, 1000);
}

export function pauseTimer() {
  clearInterval(STATE.timerInterval);
  STATE.timerRunning = false;
  const startBtn = document.getElementById('timer-start');
  if (startBtn) startBtn.textContent = '▶ Start';
}

export function resetTimer() {
  pauseTimer();
  STATE.timerSeconds = 25 * 60;
  const timerEl = document.getElementById('focus-timer');
  if (timerEl) timerEl.textContent = '25:00';
}

export function stopTimer() {
  pauseTimer();
}
