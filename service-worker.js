/**
 * service-worker.js — EveryDay PWA Service Worker
 * =================================================
 * Strategy: Cache-first for all static assets.
 * Falls back to network for anything not cached.
 *
 * IMPORTANT: This file must sit in the root of the served directory.
 * In production (GitHub Pages /EveryDay/), Vite copies public/* to dist/,
 * so this file will live at /EveryDay/service-worker.js — which is correct.
 */

const CACHE_NAME = 'everyday-v1';

// Assets to pre-cache on install.
// NOTE: These paths are relative to the service worker's scope root.
// On GitHub Pages the scope is /EveryDay/ so '.' = /EveryDay/
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

// ── Install: pre-cache core assets ─────────────────────────────────────────

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  // Immediately activate this SW without waiting for old tabs to close
  self.skipWaiting();
});

// ── Activate: purge old caches ──────────────────────────────────────────────

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  // Take control of all clients immediately
  self.clients.claim();
});

// ── Fetch: Cache-first, network fallback ────────────────────────────────────

self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Skip API calls and cross-origin requests — let them go straight to network
  if (
    url.pathname.includes('/api/') ||
    url.origin !== self.location.origin
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Serve from cache; also fetch & update cache in background (stale-while-revalidate)
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const cloned = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cloned));
            }
            return networkResponse;
          })
          .catch(() => {/* network unavailable — already serving cache */});

        // Return cached immediately
        return cachedResponse;
      }

      // Not in cache — fetch from network and cache for next time
      return fetch(event.request)
        .then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type === 'opaque') {
            return networkResponse;
          }
          const cloned = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cloned));
          return networkResponse;
        })
        .catch(() => {
          // Network failed and nothing in cache — return offline fallback for navigation
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
    })
  );
});
