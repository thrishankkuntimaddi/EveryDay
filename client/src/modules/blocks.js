/**
 * blocks.js — Dashboard block rendering and task interaction.
 * Communicates with the server via the api client for all task state changes.
 */

import { STATE } from './state.js';
import { BLOCKS } from './data.js';
import api from '../api/api.js';
import { showToast } from '../utils/toast.js';
import { openFocusMode } from './focusMode.js';

// ── Progress Calculations ────────────────────────────────────────────────────

export function getOverallProgress() {
  let total = 0, done = 0;
  BLOCKS.forEach(block => {
    block.tasks.forEach(task => {
      if (STATE.minimumMode && !task.isCore) return;
      total++;
      if (STATE.tasks[task.id]) done++;
    });
  });
  return { total, done, pct: total > 0 ? Math.round((done / total) * 100) : 0 };
}

export function getBlockProgress(block) {
  let total = 0, done = 0;
  block.tasks.forEach(task => {
    if (STATE.minimumMode && !task.isCore) return;
    total++;
    if (STATE.tasks[task.id]) done++;
  });
  return { total, done, pct: total > 0 ? Math.round((done / total) * 100) : 0 };
}

// ── Render ───────────────────────────────────────────────────────────────────

export function renderBlocks() {
  const container = document.getElementById('blocks-grid');
  if (!container) return;
  container.innerHTML = '';

  BLOCKS.forEach(block => {
    const { done, total, pct } = getBlockProgress(block);
    const isCompleted = total > 0 && done === total;

    const card = document.createElement('div');
    card.className = `block-card${isCompleted ? ' completed' : ''}`;
    card.id = `block-card-${block.id}`;

    card.innerHTML = `
      <div class="block-header" id="block-header-${block.id}"
           role="button" aria-expanded="false"
           aria-controls="block-body-${block.id}" tabindex="0">
        <div class="block-header-left">
          <div class="block-icon">${block.icon}</div>
          <div class="block-info">
            <div class="block-name">${block.name}</div>
            <div class="block-time">${block.time}</div>
          </div>
        </div>
        <div class="block-header-right">
          <span class="block-pct">${pct}%</span>
          <svg class="block-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </div>
      <div class="block-progress">
        <div class="block-progress-fill" style="width: ${pct}%; background: ${block.color}"></div>
      </div>
      <div class="block-body" id="block-body-${block.id}">
        <div class="block-inner">
          <div class="task-list" id="task-list-${block.id}">
            ${renderTaskList(block)}
          </div>
          <button class="block-focus-btn" data-block="${block.id}"
                  aria-label="Enter focus mode for ${block.name}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
            </svg>
            Focus Mode
          </button>
        </div>
      </div>
    `;

    card.style.setProperty('--block-color', block.color);
    container.appendChild(card);
  });

  attachBlockListeners();
}

function renderTaskList(block) {
  return block.tasks.map(task => {
    const done = !!STATE.tasks[task.id];
    const isHidden = STATE.minimumMode && !task.isCore;
    const badgeHtml = task.isCore
      ? '<span class="task-badge badge-min">Essential</span>'
      : '';

    return `
      <div class="task-item${done ? ' done' : ''}${isHidden ? ' hidden-task' : ''}"
           id="task-${task.id}"
           data-task="${task.id}"
           role="checkbox"
           aria-checked="${done}"
           tabindex="0"
           style="${isHidden ? 'display:none' : ''}">
        <div class="custom-checkbox"></div>
        <span class="task-label">${task.label}</span>
        ${badgeHtml}
      </div>
    `;
  }).join('');
}

// ── Block Interaction ─────────────────────────────────────────────────────────

function attachBlockListeners() {
  document.querySelectorAll('.block-header').forEach(header => {
    const blockId = header.id.replace('block-header-', '');
    header.addEventListener('click', () => toggleBlock(blockId));
    header.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleBlock(blockId); }
    });
  });

  document.querySelectorAll('.task-item').forEach(item => {
    item.addEventListener('click', () => toggleTask(item.dataset.task));
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleTask(item.dataset.task); }
    });
  });

  document.querySelectorAll('.block-focus-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      openFocusMode(btn.dataset.block);
    });
  });
}

export function toggleBlock(blockId) {
  const card = document.getElementById(`block-card-${blockId}`);
  const header = document.getElementById(`block-header-${blockId}`);
  const isExpanded = card.classList.contains('expanded');

  document.querySelectorAll('.block-card.expanded').forEach(c => {
    c.classList.remove('expanded');
    c.querySelector('.block-header').setAttribute('aria-expanded', 'false');
  });

  if (!isExpanded) {
    card.classList.add('expanded');
    header.setAttribute('aria-expanded', 'true');
  }
}

// ── Task Toggle (calls server) ────────────────────────────────────────────────

export async function toggleTask(taskId) {
  // Optimistic update
  STATE.tasks[taskId] = !STATE.tasks[taskId];

  const item = document.getElementById(`task-${taskId}`);
  if (item) {
    item.classList.toggle('done', STATE.tasks[taskId]);
    item.setAttribute('aria-checked', STATE.tasks[taskId]);
  }

  const block = BLOCKS.find(b => b.tasks.some(t => t.id === taskId));
  if (block) updateBlockProgress(block);
  updateMasterProgress();

  if (STATE.tasks[taskId]) {
    item?.animate([
      { transform: 'scale(1)' },
      { transform: 'scale(1.03)' },
      { transform: 'scale(1)' }
    ], { duration: 200, easing: 'ease-out' });
  }

  // Persist to server
  try {
    await api.tasks.toggle(taskId, STATE.tasks[taskId]);
  } catch (err) {
    // Rollback on failure
    STATE.tasks[taskId] = !STATE.tasks[taskId];
    if (item) {
      item.classList.toggle('done', STATE.tasks[taskId]);
      item.setAttribute('aria-checked', STATE.tasks[taskId]);
    }
    if (block) updateBlockProgress(block);
    updateMasterProgress();
    showToast('⚠️ Failed to save — check server connection', 'error');
  }
}

export function updateBlockProgress(block) {
  const { done, total, pct } = getBlockProgress(block);
  const card = document.getElementById(`block-card-${block.id}`);
  if (!card) return;

  const pctEl = card.querySelector('.block-pct');
  if (pctEl) pctEl.textContent = `${pct}%`;

  const fill = card.querySelector('.block-progress-fill');
  if (fill) fill.style.width = `${pct}%`;

  const isCompleted = total > 0 && done === total;
  card.classList.toggle('completed', isCompleted);
}

export function updateMasterProgress() {
  const { total, done, pct } = getOverallProgress();

  const fill  = document.getElementById('master-progress-fill');
  const label = document.getElementById('master-progress-label');
  const valEl = document.getElementById('overall-progress-val');

  if (fill)  fill.style.width = `${pct}%`;
  if (label) label.textContent = `${done} / ${total} tasks`;
  if (valEl) valEl.textContent = `${pct}%`;
}

export function applyMinimumMode() {
  BLOCKS.forEach(block => {
    block.tasks.forEach(task => {
      const el = document.getElementById(`task-${task.id}`);
      if (!el) return;
      el.style.display = (STATE.minimumMode && !task.isCore) ? 'none' : '';
    });
    updateBlockProgress(block);
  });
  updateMasterProgress();
}

export function openFirstBlock() {
  if (BLOCKS.length > 0) {
    const firstId = BLOCKS[0].id;
    const card   = document.getElementById(`block-card-${firstId}`);
    const header = document.getElementById(`block-header-${firstId}`);
    if (card) { card.classList.add('expanded'); header?.setAttribute('aria-expanded', 'true'); }
  }
}
