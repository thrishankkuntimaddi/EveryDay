/**
 * notifications.js — Browser notification permission and scheduling.
 */

import { STATE } from './state.js';
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

  const schedule = [
    { time: reminders.morning || '06:00', label: '🌅 Time to start your Morning Block!', body: 'Meditation → Workout → Plan the day' },
    { time: reminders.work1   || '09:00', label: '💼 Work Block 1 starting!', body: 'Resume. Applications. Momentum.' },
    { time: reminders.evening || '18:00', label: '🌆 Evening Block time!', body: 'Communication + Reading. Stay consistent.' },
    { time: reminders.night   || '22:00', label: '🌙 Night Reflection time.', body: 'Log your day. Build your streak.' },
  ];

  schedule.forEach(({ label, time, body }) => {
    const [h, m] = time.split(':').map(Number);
    const notifTime = new Date();
    notifTime.setHours(h, m, 0, 0);

    const delay = notifTime - now;
    if (delay > 0) {
      setTimeout(() => new Notification(label, { body, icon: '/favicon.png' }), delay);
    }
  });
}
