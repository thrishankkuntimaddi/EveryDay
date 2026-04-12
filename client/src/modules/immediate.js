/**
 * immediate.js — Immediate Task System (Firestore-backed)
 * =========================================================
 * A fast, lightweight, separate planning space for capturing
 * real-time thoughts and short-term tasks.
 *
 * Data is stored in Firestore at field `immediateTasks` in the user document.
 * All reads go through getCached(); all writes go through patchUserData().
 */

import { showToast } from '../utils/toast.js';
import { getCached, patchUserData } from '../lib/db.js';

// ── Internal State ─────────────────────────────────────────────────────────────
let _tasks = [];
let _expandedIds = new Set();

// ── Drag-to-reorder state (module-level so touch drag can share it) ────────────
let _immDragSrc     = null;
let _immMouseOnHdl  = false;
let _touchEl        = null;
let _touchClone     = null;
let _touchOX        = 0;
let _touchOY        = 0;

// ── Persistence (Firestore) ────────────────────────────────────────────────────
function loadTasks() {
  _tasks = getCached('immediateTasks', []).map(t => ({ ...t }));
}

function saveTasks() {
  patchUserData({ immediateTasks: JSON.parse(JSON.stringify(_tasks)) }).catch(err =>
    console.warn('[EveryDay] immediateTasks sync failed:', err.message)
  );
}

// ── Task Helpers ───────────────────────────────────────────────────────────────
function generateId() {
  return `imm-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function getProgress() {
  if (_tasks.length === 0) return { done: 0, total: 0, pct: 0 };
  const done = _tasks.filter(t => t.done).length;
  return { done, total: _tasks.length, pct: Math.round((done / _tasks.length) * 100) };
}

// ── Task Actions ───────────────────────────────────────────────────────────────
function addTask(title) {
  if (!title.trim()) return;
  const task = {
    id: generateId(),
    title: title.trim(),
    desc: '',
    subtasks: [],
    startTime: '',
    endTime: '',
    done: false,
    createdAt: Date.now(),
  };
  _tasks.push(task);
  saveTasks();
  renderImmediate();
  // Focus quick add after adding
  setTimeout(() => {
    const inp = document.getElementById('imm-quick-input');
    if (inp) inp.focus();
  }, 50);
}

function toggleTask(id) {
  const task = _tasks.find(t => t.id === id);
  if (!task) return;
  task.done = !task.done;
  saveTasks();
  renderProgressBar();
  renderTaskCard(task);
}

function toggleSubtask(taskId, subId) {
  const task = _tasks.find(t => t.id === taskId);
  if (!task) return;
  const sub = task.subtasks.find(s => s.id === subId);
  if (!sub) return;
  sub.done = !sub.done;
  saveTasks();
  renderProgressBar();
  renderTaskCard(task);
}

function deleteTask(id) {
  _tasks = _tasks.filter(t => t.id !== id);
  _expandedIds.delete(id);
  saveTasks();
  renderImmediate();
  showToast('Task removed');
}

function saveTaskField(id, field, value) {
  const task = _tasks.find(t => t.id === id);
  if (!task) return;
  task[field] = value;
  saveTasks();
}

function addSubtask(taskId, label) {
  const task = _tasks.find(t => t.id === taskId);
  if (!task || !label.trim()) return;
  task.subtasks.push({
    id: generateId(),
    label: label.trim(),
    done: false,
  });
  saveTasks();
  renderTaskCard(task);
}

function deleteSubtask(taskId, subId) {
  const task = _tasks.find(t => t.id === taskId);
  if (!task) return;
  task.subtasks = task.subtasks.filter(s => s.id !== subId);
  saveTasks();
  renderTaskCard(task);
}

function clearAll() {
  if (!_tasks.length) return;
  if (!confirm('Clear all immediate tasks?')) return;
  _tasks = [];
  _expandedIds.clear();
  saveTasks();
  renderImmediate();
  showToast('Immediate tasks cleared');
}

// ── Rendering ─────────────────────────────────────────────────────────────────
function renderProgressBar() {
  const bar   = document.getElementById('imm-progress-bar');
  const label = document.getElementById('imm-progress-label');
  if (!bar || !label) return;

  const { done, total, pct } = getProgress();
  bar.style.width = `${pct}%`;
  label.textContent = total === 0
    ? 'No tasks yet'
    : `${done} of ${total} done`;

  // Color shift based on completion
  const barFill = document.getElementById('imm-progress-fill');
  if (barFill) {
    if (pct === 100) {
      barFill.style.background = 'linear-gradient(90deg, #10b981, #34d399)';
    } else if (pct >= 50) {
      barFill.style.background = 'linear-gradient(90deg, #7c3aed, #06b6d4)';
    } else {
      barFill.style.background = 'linear-gradient(90deg, #7c3aed, #9d64f8)';
    }
  }
}

function buildSubtasksHTML(task) {
  if (!task.subtasks.length && !_expandedIds.has(task.id)) return '';
  return `
    <div class="imm-subtasks" id="imm-subtasks-${task.id}">
      ${task.subtasks.map(sub => `
        <div class="imm-subtask-item${sub.done ? ' done' : ''}"
             data-task="${task.id}" data-sub="${sub.id}">
          <div class="imm-sub-checkbox"></div>
          <span class="imm-sub-label">${escapeHtml(sub.label)}</span>
          <button class="imm-sub-del" data-task="${task.id}" data-sub="${sub.id}" title="Remove subtask">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      `).join('')}
      ${_expandedIds.has(task.id) ? `
        <div class="imm-add-subtask-row">
          <input class="imm-sub-input" id="imm-sub-input-${task.id}"
                 placeholder="Add subtask…" maxlength="80" />
          <button class="imm-sub-add-btn" data-task="${task.id}">+</button>
        </div>
      ` : ''}
    </div>
  `;
}

function buildExpandedHTML(task) {
  if (!_expandedIds.has(task.id)) return '';
  return `
    <div class="imm-task-expand" id="imm-expand-${task.id}">
      <div class="imm-expand-inner">
        <textarea class="imm-desc-input" id="imm-desc-${task.id}"
                  placeholder="Description (optional)…"
                  rows="2">${escapeHtml(task.desc)}</textarea>
        <div class="imm-time-row">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          <input class="imm-time-input" id="imm-start-${task.id}"
                 type="time" value="${task.startTime}" title="Start time" />
          <span class="imm-time-sep">→</span>
          <input class="imm-time-input" id="imm-end-${task.id}"
                 type="time" value="${task.endTime}" title="End time" />
        </div>
      </div>
      ${buildSubtasksHTML(task)}
    </div>
  `;
}

function buildCardHTML(task) {
  const isExpanded = _expandedIds.has(task.id);
  const hasSubtasks = task.subtasks.length > 0;
  const hasDesc = task.desc.trim().length > 0;
  const hasTime = task.startTime || task.endTime;

  let timeBadge = '';
  if (hasTime) {
    const t = [task.startTime, task.endTime].filter(Boolean).join(' → ');
    timeBadge = `<span class="imm-time-badge">⏱ ${t}</span>`;
  }

  let subtaskProgress = '';
  if (hasSubtasks) {
    const subDone = task.subtasks.filter(s => s.done).length;
    subtaskProgress = `<span class="imm-sub-badge">${subDone}/${task.subtasks.length}</span>`;
  }

  return `
    <div class="imm-task-card${task.done ? ' done' : ''}${isExpanded ? ' expanded' : ''}"
         id="imm-card-${task.id}">
      <div class="imm-task-main">
        <div class="imm-drag-handle" title="Drag to reorder" aria-label="Drag to reorder">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="9" cy="4" r="2"/><circle cx="15" cy="4" r="2"/>
            <circle cx="9" cy="12" r="2"/><circle cx="15" cy="12" r="2"/>
            <circle cx="9" cy="20" r="2"/><circle cx="15" cy="20" r="2"/>
          </svg>
        </div>
        <button class="imm-checkbox${task.done ? ' checked' : ''}"
                data-action="toggle" data-id="${task.id}"
                aria-label="${task.done ? 'Mark incomplete' : 'Mark complete'}">
        </button>
        <div class="imm-task-body">
          <span class="imm-task-title${task.done ? ' done' : ''}">${escapeHtml(task.title)}</span>
          <div class="imm-task-meta">
            ${timeBadge}
            ${subtaskProgress}
            ${hasDesc ? '<span class="imm-has-desc-dot" title="Has description"></span>' : ''}
          </div>
        </div>
        <div class="imm-task-actions">
          <button class="imm-expand-btn${isExpanded ? ' open' : ''}"
                  data-action="expand" data-id="${task.id}"
                  aria-label="${isExpanded ? 'Collapse' : 'Expand'}" title="Details">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="${isExpanded ? '18 15 12 9 6 15' : '6 9 12 15 18 9'}"/>
            </svg>
          </button>
          <button class="imm-del-btn"
                  data-action="delete" data-id="${task.id}"
                  aria-label="Delete task" title="Delete">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
      ${buildExpandedHTML(task)}
    </div>
  `;
}

function renderTaskCard(task) {
  const existing = document.getElementById(`imm-card-${task.id}`);
  if (!existing) return;
  const tmp = document.createElement('div');
  tmp.innerHTML = buildCardHTML(task);
  const newCard = tmp.firstElementChild;
  existing.replaceWith(newCard);
  attachCardListeners(newCard, task);
  renderProgressBar();
}

function attachCardListeners(card, task) {
  // Toggle done
  card.querySelector('[data-action="toggle"]')?.addEventListener('click', e => {
    e.stopPropagation();
    toggleTask(task.id);
  });

  // Expand/collapse
  card.querySelector('[data-action="expand"]')?.addEventListener('click', e => {
    e.stopPropagation();
    if (_expandedIds.has(task.id)) {
      _expandedIds.delete(task.id);
    } else {
      _expandedIds.add(task.id);
    }
    renderTaskCard(task);
  });

  // Delete
  card.querySelector('[data-action="delete"]')?.addEventListener('click', e => {
    e.stopPropagation();
    deleteTask(task.id);
  });

  // Description textarea
  const descInput = card.querySelector(`#imm-desc-${task.id}`);
  if (descInput) {
    descInput.addEventListener('input', () => saveTaskField(task.id, 'desc', descInput.value));
  }

  // Time inputs
  const startInput = card.querySelector(`#imm-start-${task.id}`);
  if (startInput) {
    startInput.addEventListener('change', () => saveTaskField(task.id, 'startTime', startInput.value));
  }
  const endInput = card.querySelector(`#imm-end-${task.id}`);
  if (endInput) {
    endInput.addEventListener('change', () => saveTaskField(task.id, 'endTime', endInput.value));
  }

  // Subtask checkboxes
  card.querySelectorAll('.imm-subtask-item').forEach(item => {
    item.addEventListener('click', e => {
      if (e.target.closest('.imm-sub-del')) return;
      toggleSubtask(item.dataset.task, item.dataset.sub);
    });
  });

  // Subtask delete buttons
  card.querySelectorAll('.imm-sub-del').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      deleteSubtask(btn.dataset.task, btn.dataset.sub);
    });
  });

  // Add subtask
  const subAddBtn = card.querySelector(`[data-task="${task.id}"].imm-sub-add-btn`);
  const subInput  = card.querySelector(`#imm-sub-input-${task.id}`);
  if (subAddBtn && subInput) {
    const doAdd = () => {
      if (!subInput.value.trim()) return;
      addSubtask(task.id, subInput.value);
      subInput.value = '';
      subInput.focus();
    };
    subAddBtn.addEventListener('click', doAdd);
    subInput.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); doAdd(); }});
  }
}

function renderTaskList() {
  const list = document.getElementById('imm-task-list');
  if (!list) return;

  if (_tasks.length === 0) {
    list.innerHTML = `
      <div class="imm-empty" id="imm-empty">
        <div class="imm-empty-icon">⚡</div>
        <p>No immediate tasks.</p>
        <p class="imm-empty-hint">Use the field below to capture a thought fast.</p>
      </div>
    `;
    return;
  }

  list.innerHTML = _tasks.map(t => buildCardHTML(t)).join('');

  _tasks.forEach(task => {
    const card = document.getElementById(`imm-card-${task.id}`);
    if (card) attachCardListeners(card, task);
  });

  // Init drag-to-reorder after cards are in the DOM
  _initImmDrag(list);
}

// ── Main Render ───────────────────────────────────────────────────────────────
export function renderImmediate() {
  loadTasks();
  renderProgressBar();
  renderTaskList();
  attachQuickAddListener();
}

function attachQuickAddListener() {
  // Re-attach (idempotent guard with flag)
  const input = document.getElementById('imm-quick-input');
  const btn   = document.getElementById('imm-quick-add-btn');
  const clearBtn = document.getElementById('imm-clear-btn');

  if (input && !input._immListenerAttached) {
    input._immListenerAttached = true;

    input.addEventListener('keydown', e => {
      if (e.key === 'Enter' && input.value.trim()) {
        e.preventDefault();
        addTask(input.value);
        input.value = '';
      }
    });

    btn?.addEventListener('click', () => {
      if (input.value.trim()) {
        addTask(input.value);
        input.value = '';
      }
      input.focus();
    });

    clearBtn?.addEventListener('click', clearAll);
  }
}

// ── Drag-to-Reorder (Desktop HTML5 DnD + Touch) ───────────────────────────────

function _initImmDrag(list) {
  if (!list) return;

  list.querySelectorAll('.imm-task-card').forEach(card => {
    card.draggable = false;
    const handle = card.querySelector('.imm-drag-handle');
    if (!handle) return;

    // ── Desktop HTML5 DnD ──
    handle.addEventListener('mousedown', () => {
      _immMouseOnHdl = true;
      card.draggable = true;
    });

    card.addEventListener('mouseup', () => {
      if (!_immDragSrc) {
        _immMouseOnHdl = false;
        card.draggable = false;
      }
    });

    card.addEventListener('dragstart', e => {
      if (!_immMouseOnHdl) { e.preventDefault(); return; }
      _immDragSrc = card;
      card.classList.add('imm-dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', card.id);
      _immMouseOnHdl = false;
    });

    card.addEventListener('dragend', () => {
      card.classList.remove('imm-dragging');
      card.draggable = false;
      list.querySelectorAll('.imm-drag-over').forEach(el => el.classList.remove('imm-drag-over'));
      _immDragSrc = null;
    });

    card.addEventListener('dragover', e => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      if (_immDragSrc && _immDragSrc !== card) {
        list.querySelectorAll('.imm-drag-over').forEach(el => el.classList.remove('imm-drag-over'));
        card.classList.add('imm-drag-over');
      }
    });

    card.addEventListener('dragleave', e => {
      if (!card.contains(e.relatedTarget)) card.classList.remove('imm-drag-over');
    });

    card.addEventListener('drop', e => {
      e.preventDefault();
      card.classList.remove('imm-drag-over');
      if (!_immDragSrc || _immDragSrc === card) return;

      const cards   = [...list.querySelectorAll('.imm-task-card')];
      const fromIdx = cards.indexOf(_immDragSrc);
      const toIdx   = cards.indexOf(card);
      if (fromIdx === -1 || toIdx === -1) return;

      // DOM reorder
      if (fromIdx < toIdx) list.insertBefore(_immDragSrc, card.nextSibling);
      else                  list.insertBefore(_immDragSrc, card);

      // Data reorder + persist
      const [moved] = _tasks.splice(fromIdx, 1);
      _tasks.splice(toIdx, 0, moved);
      saveTasks();
    });

    // ── Touch drag ──
    handle.addEventListener('touchstart', e => {
      const rect = card.getBoundingClientRect();
      _touchEl   = card;
      _touchOX   = e.touches[0].clientX - rect.left;
      _touchOY   = e.touches[0].clientY - rect.top;

      _touchClone = card.cloneNode(true);
      Object.assign(_touchClone.style, {
        position:      'fixed',
        width:         `${rect.width}px`,
        left:          `${rect.left}px`,
        top:           `${rect.top}px`,
        zIndex:        '9999',
        pointerEvents: 'none',
        opacity:       '0.88',
        boxShadow:     '0 8px 32px rgba(0,0,0,0.55)',
        borderRadius:  '12px',
        transition:    'none',
      });
      document.body.appendChild(_touchClone);
      card.style.opacity = '0.25';
    }, { passive: true });

    handle.addEventListener('touchmove', e => {
      e.preventDefault();
      if (!_touchClone) return;
      const t = e.touches[0];
      _touchClone.style.left = `${t.clientX - _touchOX}px`;
      _touchClone.style.top  = `${t.clientY - _touchOY}px`;

      _touchClone.style.display = 'none';
      const under  = document.elementFromPoint(t.clientX, t.clientY);
      _touchClone.style.display = '';

      const target = under?.closest('.imm-task-card');
      list.querySelectorAll('.imm-drag-over').forEach(el => el.classList.remove('imm-drag-over'));
      if (target && target !== _touchEl && list.contains(target)) {
        target.classList.add('imm-drag-over');
      }
    }, { passive: false });

    handle.addEventListener('touchend', e => {
      if (!_touchClone) return;
      const t = e.changedTouches[0];
      _touchClone.style.display = 'none';
      const under  = document.elementFromPoint(t.clientX, t.clientY);
      _touchClone.style.display = '';
      const target = under?.closest('.imm-task-card');

      if (target && target !== _touchEl && list.contains(target)) {
        const cards   = [...list.querySelectorAll('.imm-task-card')];
        const fromIdx = cards.indexOf(_touchEl);
        const toIdx   = cards.indexOf(target);
        if (fromIdx !== -1 && toIdx !== -1) {
          if (fromIdx < toIdx) list.insertBefore(_touchEl, target.nextSibling);
          else                  list.insertBefore(_touchEl, target);
          const [moved] = _tasks.splice(fromIdx, 1);
          _tasks.splice(toIdx, 0, moved);
          saveTasks();
        }
      }

      _touchClone.remove();
      _touchClone = null;
      if (_touchEl) _touchEl.style.opacity = '';
      list.querySelectorAll('.imm-drag-over').forEach(el => el.classList.remove('imm-drag-over'));
      _touchEl = null;
    }, { passive: true });
  });
}

// ── Utility ───────────────────────────────────────────────────────────────────
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
