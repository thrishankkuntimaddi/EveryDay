/**
 * dragSort.js — Drag-and-drop (desktop) + touch-drag (mobile) task reordering
 *
 * Works on any list with .task-item-wrapper elements inside a .task-list container.
 * On sort completion, the BLOCKS array is updated and persisted to localStorage.
 */

import { BLOCKS } from './data.js';

const DRAG_HANDLE_CLASS = 'drag-handle';
const DRAGGING_CLASS    = 'dragging';
const DRAG_OVER_CLASS   = 'drag-over';

let _dragSrc    = null;   // element being dragged
let _dragBlockId = null;  // block the drag started in

// ── Public init ───────────────────────────────────────────────────────────────

export function initDragSort() {
  document.querySelectorAll('.task-list').forEach(list => {
    const blockCard = list.closest('.block-card');
    if (!blockCard) return;
    const blockId = blockCard.id.replace('block-card-', '');
    _addDragHandles(list, blockId);
    _attachDragListeners(list, blockId);
    _attachTouchListeners(list, blockId);
  });
}

// ── Drag handles (desktop) ───────────────────────────────────────────────────

function _addDragHandles(list, blockId) {
  list.querySelectorAll('.task-item-wrapper').forEach(wrapper => {
    // Remove existing handle if any
    const existing = wrapper.querySelector(`.${DRAG_HANDLE_CLASS}`);
    if (existing) existing.remove();

    const handle = document.createElement('div');
    handle.className = DRAG_HANDLE_CLASS;
    handle.setAttribute('aria-label', 'Drag to reorder');
    handle.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="9" cy="5" r="1.5"/><circle cx="15" cy="5" r="1.5"/>
      <circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/>
      <circle cx="9" cy="19" r="1.5"/><circle cx="15" cy="19" r="1.5"/>
    </svg>`;

    // Insert handle as first child of the task-item inside wrapper
    const taskItem = wrapper.querySelector('.task-item');
    if (taskItem) taskItem.insertBefore(handle, taskItem.firstChild);
  });
}

// ── Desktop drag listeners ───────────────────────────────────────────────────

function _attachDragListeners(list, blockId) {
  list.querySelectorAll('.task-item-wrapper').forEach(wrapper => {
    wrapper.setAttribute('draggable', 'true');

    wrapper.addEventListener('dragstart', e => {
      // Only start drag from handle
      if (!e.target.closest(`.${DRAG_HANDLE_CLASS}`)) {
        e.preventDefault();
        return;
      }
      _dragSrc     = wrapper;
      _dragBlockId = blockId;
      wrapper.classList.add(DRAGGING_CLASS);
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', wrapper.id);
    });

    wrapper.addEventListener('dragend', () => {
      wrapper.classList.remove(DRAGGING_CLASS);
      list.querySelectorAll(`.${DRAG_OVER_CLASS}`).forEach(el => el.classList.remove(DRAG_OVER_CLASS));
      _dragSrc = null;
    });

    wrapper.addEventListener('dragover', e => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      if (_dragSrc && _dragSrc !== wrapper) {
        list.querySelectorAll(`.${DRAG_OVER_CLASS}`).forEach(el => el.classList.remove(DRAG_OVER_CLASS));
        wrapper.classList.add(DRAG_OVER_CLASS);
      }
    });

    wrapper.addEventListener('dragleave', () => {
      wrapper.classList.remove(DRAG_OVER_CLASS);
    });

    wrapper.addEventListener('drop', e => {
      e.preventDefault();
      wrapper.classList.remove(DRAG_OVER_CLASS);
      if (_dragSrc && _dragSrc !== wrapper && _dragBlockId === blockId) {
        const wrappers = [...list.querySelectorAll('.task-item-wrapper')];
        const fromIdx  = wrappers.indexOf(_dragSrc);
        const toIdx    = wrappers.indexOf(wrapper);

        // DOM reorder
        if (fromIdx < toIdx) {
          list.insertBefore(_dragSrc, wrapper.nextSibling);
        } else {
          list.insertBefore(_dragSrc, wrapper);
        }

        // Sync BLOCKS data
        _reorderBlock(blockId, fromIdx, toIdx);
      }
    });
  });
}

// ── Touch drag listeners (mobile) ────────────────────────────────────────────

let _touchDragEl    = null;
let _touchClone     = null;
let _touchOffsetX   = 0;
let _touchOffsetY   = 0;
let _touchList      = null;
let _touchBlockId   = null;

function _attachTouchListeners(list, blockId) {
  list.querySelectorAll(`.${DRAG_HANDLE_CLASS}`).forEach(handle => {
    handle.addEventListener('touchstart', e => {
      const wrapper = handle.closest('.task-item-wrapper');
      if (!wrapper) return;

      _touchList    = list;
      _touchBlockId = blockId;
      _touchDragEl  = wrapper;

      const rect = wrapper.getBoundingClientRect();
      _touchOffsetX = e.touches[0].clientX - rect.left;
      _touchOffsetY = e.touches[0].clientY - rect.top;

      // Create floating clone
      _touchClone = wrapper.cloneNode(true);
      _touchClone.className += ' drag-touch-clone';
      _touchClone.style.cssText = `
        position: fixed;
        width: ${rect.width}px;
        left: ${rect.left}px;
        top: ${rect.top}px;
        z-index: 9999;
        pointer-events: none;
        opacity: 0.85;
        box-shadow: 0 8px 32px rgba(0,0,0,0.5);
      `;
      document.body.appendChild(_touchClone);
      wrapper.style.opacity = '0.3';
    }, { passive: true });

    handle.addEventListener('touchmove', e => {
      e.preventDefault();
      if (!_touchClone) return;

      const touch = e.touches[0];
      _touchClone.style.left = `${touch.clientX - _touchOffsetX}px`;
      _touchClone.style.top  = `${touch.clientY - _touchOffsetY}px`;

      // Find target wrapper under touch
      _touchClone.style.display = 'none';
      const elUnder = document.elementFromPoint(touch.clientX, touch.clientY);
      _touchClone.style.display = '';

      const targetWrapper = elUnder?.closest('.task-item-wrapper');
      _touchList.querySelectorAll(`.${DRAG_OVER_CLASS}`).forEach(el => el.classList.remove(DRAG_OVER_CLASS));
      if (targetWrapper && targetWrapper !== _touchDragEl && _touchList.contains(targetWrapper)) {
        targetWrapper.classList.add(DRAG_OVER_CLASS);
      }
    }, { passive: false });

    handle.addEventListener('touchend', e => {
      if (!_touchClone) return;

      const touch = e.changedTouches[0];
      _touchClone.style.display = 'none';
      const elUnder = document.elementFromPoint(touch.clientX, touch.clientY);
      _touchClone.style.display = '';

      const targetWrapper = elUnder?.closest('.task-item-wrapper');

      if (targetWrapper && targetWrapper !== _touchDragEl && _touchList?.contains(targetWrapper)) {
        const wrappers = [..._touchList.querySelectorAll('.task-item-wrapper')];
        const fromIdx  = wrappers.indexOf(_touchDragEl);
        const toIdx    = wrappers.indexOf(targetWrapper);

        if (fromIdx < toIdx) {
          _touchList.insertBefore(_touchDragEl, targetWrapper.nextSibling);
        } else {
          _touchList.insertBefore(_touchDragEl, targetWrapper);
        }

        _reorderBlock(_touchBlockId, fromIdx, toIdx);
      }

      // Cleanup
      _touchClone.remove();
      _touchClone = null;
      if (_touchDragEl) { _touchDragEl.style.opacity = ''; }
      _touchList.querySelectorAll(`.${DRAG_OVER_CLASS}`).forEach(el => el.classList.remove(DRAG_OVER_CLASS));
      _touchDragEl = null;
    }, { passive: true });
  });
}

// ── BLOCKS reorder sync ───────────────────────────────────────────────────────

function _reorderBlock(blockId, fromIdx, toIdx) {
  const block = BLOCKS.find(b => b.id === blockId);
  if (!block) return;

  const tasks = block.tasks;
  const [moved] = tasks.splice(fromIdx, 1);
  tasks.splice(toIdx, 0, moved);

  // Persist to localStorage (via planEditor's storage key)
  try {
    localStorage.setItem('everyday_custom_plan', JSON.stringify(BLOCKS));
  } catch {}
}
