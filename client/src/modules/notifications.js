/**
 * notifications.js — Browser notification permission and scheduling.
 * Reads reminders from STATE.settings.reminders which is keyed by block.id.
 */

import { STATE }  from './state.js';
import { BLOCKS } from './data.js';
import { showToast } from '../utils/toast.js';

export async function requestNotifications() {
  if (!('Notification' in window)) {
    showToast('Browser notifications not supported');
    return;
  }

  const perm = await Notification.requestPermission();
  STATE.notificationsEnabled = perm === 'granted';

  if (STATE.notificationsEnabled) {
    showToast('🔔 Notifications enabled!', 'success');
    scheduleReminders();
  } else {
    showToast('Notifications blocked. Enable in browser settings.');
  }
}

export function scheduleReminders() {
  if (!STATE.notificationsEnabled) return;

  const reminders = STATE.settings.reminders || {};
  const now = new Date();

  BLOCKS.forEach(block => {
    const cfg = reminders[block.id];
    if (!cfg) return;                   // block has no reminder saved yet
    if (cfg.enabled === false) return;  // explicitly disabled

    const time24 = cfg.time24 || block.time?.match(/\d{2}:\d{2}/)?.[0] || '09:00';
    const [h, m] = time24.split(':').map(Number);

    const notifTime = new Date();
    notifTime.setHours(h, m, 0, 0);

    const delay = notifTime - now;
    if (delay > 0) {
      setTimeout(() => {
        new Notification(`${block.icon} ${block.name}`, {
          body: block.tasks.slice(0, 2).map(t => t.label).join(' · '),
          icon: '/favicon.png',
        });
      }, delay);
    }
  });
}

