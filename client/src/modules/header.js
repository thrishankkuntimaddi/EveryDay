/**
 * header.js — Header UI updates: streak, phase badge, date.
 */

import { STATE } from './state.js';
import { PHASES } from './data.js';

export function updateHeaderStreak() {
  const countEl = document.getElementById('streak-count-header');
  const valEl   = document.getElementById('streak-value');
  if (countEl) countEl.textContent = STATE.streak.count;
  if (valEl)   valEl.textContent   = `${STATE.streak.count} days`;
}

export function updatePhaseBadge() {
  const phase   = PHASES.find(p => p.id === STATE.phase);
  const badgeEl = document.getElementById('phase-badge-header');
  const dispEl  = document.getElementById('phase-display');
  const name    = phase?.name || 'Stabilization';
  if (badgeEl) badgeEl.textContent = name;
  if (dispEl)  dispEl.textContent  = name;
}

export function updateTodayDate() {
  const el = document.getElementById('today-date');
  if (el) el.textContent = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric'
  });
}
