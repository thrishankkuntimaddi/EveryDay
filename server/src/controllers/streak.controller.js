/**
 * streak.controller.js
 *
 * Manages streak data: current count, longest streak, and last active date.
 */

import * as store from '../db/store.js';
import { todayKey, isYesterday } from '../utils/date.js';

/**
 * GET /api/streak
 */
export function getStreak(req, res) {
  const streak = store.get('streak');
  res.json(streak);
}

/**
 * POST /api/streak/update
 * Called on app load to check for daily reset and update streak.
 * Body: { lastDate: string | null }
 */
export function updateStreak(req, res) {
  const lastDate = store.get('lastDate');
  const today = todayKey();
  const streak = store.get('streak') || { count: 0, lastDate: null, longest: 0 };

  if (lastDate && lastDate !== today) {
    // New day — calculate streak
    if (isYesterday(lastDate)) {
      streak.count += 1;
      if (streak.count > streak.longest) streak.longest = streak.count;
    } else {
      // Missed a day — reset streak
      streak.count = 0;
    }

    streak.lastDate = today;
    store.set('streak', streak);
    store.set('lastDate', today);

    res.json({ updated: true, newDay: true, streak });
  } else if (!lastDate) {
    // First ever load
    store.set('lastDate', today);
    streak.lastDate = today;
    store.set('streak', streak);
    res.json({ updated: true, newDay: true, streak });
  } else {
    // Same day — no change
    res.json({ updated: false, newDay: false, streak });
  }
}

/**
 * PATCH /api/streak/showup
 * Called when user submits EOD and confirms they showed up.
 * Ensures at least count = 1 for today.
 */
export function confirmShowUp(req, res) {
  const streak = store.get('streak') || { count: 0, lastDate: null, longest: 0 };
  const today = todayKey();

  streak.count = Math.max(streak.count, 1);
  if (streak.count > streak.longest) streak.longest = streak.count;
  streak.lastDate = today;

  store.set('streak', streak);
  res.json({ streak });
}
