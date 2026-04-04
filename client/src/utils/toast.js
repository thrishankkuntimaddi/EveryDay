/**
 * toast.js — Lightweight toast notification system.
 */

let toastTimeout;

/**
 * @param {string} msg
 * @param {'default'|'success'|'error'} type
 * @param {number} duration
 */
export function showToast(msg, type = 'default', duration = 3000) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = msg;
  toast.className = `toast show ${type}`;

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}
