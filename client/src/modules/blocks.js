/**
 * blocks.js — Dashboard block rendering and task interaction.
 * Communicates with the server via the api client for all task state changes.
 */

import { STATE } from './state.js';
import { BLOCKS } from './data.js';
import api from '../api/api.js';
import { showToast } from '../utils/toast.js';
import { openFocusMode } from './focusMode.js';
import { isBlockMarkable, getBlockStatus, getBlockRange } from './blockTimer.js';

// ── Progress Calculations ────────────────────────────────────────────────────

/**
 * Count effective units for progress:
 * - If a task has subTasks, each subtask is a unit (weighted).
 * - Otherwise, the task itself is a unit.
 */
export function getOverallProgress() {
  let totalWeight = 0, doneWeight = 0;

  BLOCKS.forEach(block => {
    block.tasks.forEach(task => {
      if (STATE.minimumMode && !task.isCore) return;
      if (task.subTasks && task.subTasks.length > 0) {
        task.subTasks.forEach(st => {
          const w = st.weight || 1;
          totalWeight += w;
          if (STATE.tasks[st.id]) doneWeight += w;
        });
      } else {
        totalWeight += 1;
        if (STATE.tasks[task.id]) doneWeight += 1;
      }
    });
  });

  const pct = totalWeight > 0 ? Math.round((doneWeight / totalWeight) * 100) : 0;
  return { total: Math.ceil(totalWeight), done: Math.round(doneWeight), pct };
}

export function getBlockProgress(block) {
  let totalWeight = 0, doneWeight = 0;

  block.tasks.forEach(task => {
    if (STATE.minimumMode && !task.isCore) return;
    if (task.subTasks && task.subTasks.length > 0) {
      task.subTasks.forEach(st => {
        const w = st.weight || 1;
        totalWeight += w;
        if (STATE.tasks[st.id]) doneWeight += w;
      });
    } else {
      totalWeight += 1;
      if (STATE.tasks[task.id]) doneWeight += 1;
    }
  });

  const pct = totalWeight > 0 ? Math.round((doneWeight / totalWeight) * 100) : 0;
  return { total: Math.ceil(totalWeight), done: Math.round(doneWeight), pct };
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

    const status = getBlockStatus(block);
    card.classList.add(`block-status-${status}`);

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
          <div class="block-header-meta">
            <span class="block-countdown" id="block-cd-${block.id}">—</span>
            <span class="block-pct">${pct}%</span>
          </div>
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

  // Signal other modules that blocks have been re-rendered
  window.dispatchEvent(new CustomEvent('everyday:blocksRendered'));
}

function renderTaskList(block) {
  const markable = isBlockMarkable(block);

  return block.tasks.map(task => {
    const done     = !!STATE.tasks[task.id];
    const isHidden = STATE.minimumMode && !task.isCore;
    const locked   = !markable;
    const badgeHtml = task.isCore
      ? '<span class="task-badge badge-min">Essential</span>'
      : '';
    const lockHtml = locked
      ? `<span class="task-lock-icon" title="Unlocks when block ends">🔒</span>`
      : '';
    const statusCls = locked ? ' task-locked' : '';

    // Description button
    const descBtn = task.description
      ? `<button class="task-desc-btn" data-task="${task.id}" title="View description" aria-label="Task description">ℹ️</button>`
      : '';

    // Sub-tasks
    let subTasksHtml = '';
    if (task.subTasks && task.subTasks.length > 0) {
      const subItems = task.subTasks.map(st => {
        const stDone = !!STATE.tasks[st.id];
        const weight = (st.weight || 1);
        return `
          <div class="subtask-item${stDone ? ' done' : ''}${locked ? ' task-locked' : ''}"
               id="task-${st.id}"
               data-task="${st.id}"
               role="checkbox"
               aria-checked="${stDone}"
               tabindex="0">
            <div class="custom-checkbox subtask-checkbox"></div>
            <span class="task-label subtask-label">${st.label}</span>
            <span class="subtask-weight">${weight}pts</span>
          </div>
        `;
      }).join('');
      subTasksHtml = `<div class="subtask-list" id="subtasks-${task.id}">${subItems}</div>`;
    }

    // Description panel
    const descHtml = task.description
      ? `<div class="task-desc-panel" id="desc-${task.id}" hidden>
           <p class="task-desc-text">${task.description.replace(/\n/g, '<br>')}</p>
         </div>`
      : '';

    return `
      <div class="task-item-wrapper" id="task-wrapper-${task.id}"
           style="${isHidden ? 'display:none' : ''}">
        <div class="task-item${done ? ' done' : ''}${statusCls}"
             id="task-${task.id}"
             data-task="${task.id}"
             data-locked="${locked}"
             role="checkbox"
             aria-checked="${done}"
             tabindex="0">
          <div class="custom-checkbox"></div>
          <span class="task-label">${task.label}</span>
          ${badgeHtml}
          ${descBtn}
          ${lockHtml}
        </div>
        ${descHtml}
        ${subTasksHtml}
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
    item.addEventListener('click', e => {
      // Don't toggle if clicking description button
      if (e.target.closest('.task-desc-btn')) return;
      toggleTask(item.dataset.task);
    });
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleTask(item.dataset.task); }
    });
  });

  // Sub-task items
  document.querySelectorAll('.subtask-item').forEach(item => {
    item.addEventListener('click', () => toggleTask(item.dataset.task));
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleTask(item.dataset.task); }
    });
  });

  // Description toggle buttons
  document.querySelectorAll('.task-desc-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const taskId = btn.dataset.task;
      const panel  = document.getElementById(`desc-${taskId}`);
      if (panel) {
        const isHidden = panel.hidden;
        panel.hidden = !isHidden;
        btn.classList.toggle('desc-btn-active', !isHidden === false);
        btn.title = isHidden ? 'Hide description' : 'View description';
      }
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
  const card   = document.getElementById(`block-card-${blockId}`);
  const header = document.getElementById(`block-header-${blockId}`);
  if (!card || !header) return;

  const isExpanded = card.classList.contains('expanded');
  card.classList.toggle('expanded', !isExpanded);
  header.setAttribute('aria-expanded', String(!isExpanded));
}

// ── Task Toggle (calls server) ────────────────────────────────────────────────

export async function toggleTask(taskId) {
  // Check if task is time-locked
  const block = BLOCKS.find(b => b.tasks.some(t => t.id === taskId));
  if (block && !isBlockMarkable(block)) {
    const { endMin } = getBlockRange(block);
    const h = Math.floor(endMin / 60).toString().padStart(2, '0');
    const m = (endMin % 60).toString().padStart(2, '0');
    showToast(`🔒 Tasks unlock after ${h}:${m}`, 'error');
    return;
  }

  // Check if day is EOD-locked (after submission, before 4AM)
  if (STATE.eodLocked) {
    showToast('🔒 Day locked after reflection. Unlocks at 4:00 AM.', 'error');
    return;
  }

  // Optimistic update
  STATE.tasks[taskId] = !STATE.tasks[taskId];

  const item = document.getElementById(`task-${taskId}`);
  if (item) {
    item.classList.toggle('done', STATE.tasks[taskId]);
    item.setAttribute('aria-checked', STATE.tasks[taskId]);
  }

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

  // Flat bar (kept for backward-compat, element may not exist)
  const fill = document.getElementById('master-progress-fill');
  if (fill) fill.style.width = `${pct}%`;

  // Task count label
  const label = document.getElementById('master-progress-label');
  if (label) label.textContent = `${done} / ${total} tasks`;

  // Percentage text in ring
  const valEl = document.getElementById('overall-progress-val');
  if (valEl) valEl.textContent = `${pct}%`;

  // Circular ring: circumference = 2π × r(26) ≈ 163.36
  const CIRCUMFERENCE = 163.36;
  const ring = document.getElementById('master-ring-fill');
  if (ring) {
    const offset = CIRCUMFERENCE * (1 - pct / 100);
    ring.style.strokeDashoffset = offset;

    if (pct === 100) {
      ring.style.filter = 'drop-shadow(0 0 10px rgba(16,185,129,0.8))';
      ring.setAttribute('stroke', '#10b981');
    } else {
      ring.style.filter = 'drop-shadow(0 0 6px rgba(124,58,237,0.6))';
      ring.setAttribute('stroke', 'url(#ringGradient)');
    }
  }

  // Notify EOD module so it can re-evaluate its unlock state (no circular import)
  window.dispatchEvent(new CustomEvent('everyday:progress', { detail: { pct } }));
}

export function applyMinimumMode() {
  BLOCKS.forEach(block => {
    block.tasks.forEach(task => {
      // Target the wrapper (which wraps item + desc + subtasks)
      const wrapper = document.getElementById(`task-wrapper-${task.id}`);
      const el      = document.getElementById(`task-${task.id}`);
      const target  = wrapper || el;
      if (!target) return;
      target.style.display = (STATE.minimumMode && !task.isCore) ? 'none' : '';
    });
    updateBlockProgress(block);
  });
  updateMasterProgress();
}


export function openFirstBlock() {
  // Expand all blocks on load so the full day plan is visible
  BLOCKS.forEach(block => {
    const card   = document.getElementById(`block-card-${block.id}`);
    const header = document.getElementById(`block-header-${block.id}`);
    if (card)   card.classList.add('expanded');
    if (header) header.setAttribute('aria-expanded', 'true');
  });
}
