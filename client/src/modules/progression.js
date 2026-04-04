/**
 * progression.js — Phase selector, detail card, and heatmap rendering.
 */

import { STATE } from './state.js';
import { PHASES } from './data.js';
import api from '../api/api.js';
import { updatePhaseBadge } from './header.js';
import { showToast } from '../utils/toast.js';
import { formatDateDisplay } from '../utils/date.js';

export function renderProgression() {
  renderPhaseSelector();
  renderPhaseDetail();
  renderHeatmap();
}

export function renderPhaseSelector() {
  const grid = document.getElementById('phase-selector-grid');
  if (!grid) return;

  grid.innerHTML = PHASES.map(phase => `
    <div class="phase-option${STATE.phase === phase.id ? ' active' : ''}"
         data-phase="${phase.id}"
         id="phase-option-${phase.id}"
         role="radio"
         aria-checked="${STATE.phase === phase.id}"
         tabindex="0"
         style="--phase-color: ${phase.color}; --phase-gradient: ${phase.gradient}">
      <span class="phase-emoji">${phase.emoji}</span>
      <div class="phase-option-name">${phase.name}</div>
      <div class="phase-number">${phase.number}</div>
    </div>
  `).join('');

  grid.querySelectorAll('.phase-option').forEach(opt => {
    opt.addEventListener('click', () => selectPhase(opt.dataset.phase));
    opt.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectPhase(opt.dataset.phase); }
    });
  });
}

async function selectPhase(phaseId) {
  STATE.phase = phaseId;

  document.querySelectorAll('.phase-option').forEach(opt => {
    const active = opt.dataset.phase === phaseId;
    opt.classList.toggle('active', active);
    opt.setAttribute('aria-checked', active);
  });

  renderPhaseDetail();
  updatePhaseBadge();
  showToast(`Phase set to ${PHASES.find(p => p.id === phaseId)?.name}`);

  try {
    await api.settings.setPhase(phaseId);
  } catch (err) {
    showToast('⚠️ Failed to save phase to server', 'error');
  }
}

export function renderPhaseDetail() {
  const phase = PHASES.find(p => p.id === STATE.phase);
  const card  = document.getElementById('phase-detail-card');
  if (!phase || !card) return;

  card.style.setProperty('--phase-color', phase.color);
  card.style.borderColor = `${phase.color}33`;

  card.innerHTML = `
    <div class="phase-detail-header">
      <div class="phase-detail-icon">${phase.emoji}</div>
      <div>
        <div class="phase-detail-name" style="color: ${phase.color}">${phase.name}</div>
        <div class="phase-detail-sub">${phase.number} — Identity Evolution</div>
      </div>
    </div>
    <p class="phase-detail-desc">${phase.description}</p>
    <div class="phase-intensity-bar">
      <span class="phase-intensity-label">Intensity</span>
      <div class="phase-intensity-track">
        <div class="phase-intensity-fill" style="width: ${phase.intensity}%; background: ${phase.gradient}"></div>
      </div>
      <span style="font-size: 0.8rem; font-weight: 700; color: ${phase.color}; font-family: 'JetBrains Mono', monospace">${phase.intensity}%</span>
    </div>
    <div class="phase-hints">
      ${phase.hints.map(h => `
        <div class="phase-hint">
          <div class="phase-hint-dot" style="background: ${phase.color}"></div>
          <span>${h}</span>
        </div>
      `).join('')}
    </div>
  `;
}

export function renderHeatmap() {
  const grid = document.getElementById('heatmap-grid');
  if (!grid) return;

  grid.innerHTML = '';
  const days = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    days.push(`${y}-${m}-${day}`);
  }

  days.forEach(dateStr => {
    const entry = STATE.history.find(h => h.date === dateStr);
    const div = document.createElement('div');
    div.className = 'heatmap-day';

    if (entry) {
      if (entry.showed === 'no') {
        div.classList.add('showed-no');
      } else if (entry.effort) {
        div.classList.add(`effort-${entry.effort}`);
      }
      div.setAttribute('data-tip', `${formatDateDisplay(dateStr)} · Effort: ${entry.effort || '?'}/5`);
    } else {
      div.setAttribute('data-tip', formatDateDisplay(dateStr));
    }

    grid.appendChild(div);
  });
}
