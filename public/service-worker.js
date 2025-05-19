// public/service-worker.js

// Name of the cache to hold our offline page
const CACHE_NAME = 'offline-fallback-cache';
// Use leading slash so you always hit the real file, not index.html rewrite
const OFFLINE_URL = '/offline.html';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Force a fresh download of offline.html and add it to the cache
      return cache.add(new Request(OFFLINE_URL, { cache: 'reload' }));
    })
  );
  // Activate this SW version immediately
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })
  );
  // Claim any clients immediately so the SW starts controlling pages
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Only handle navigation requests (e.g. user typing a URL, SPA route change)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          // Try the network first
          return await fetch(event.request);
        } catch (err) {
          // If it fails (likely offline), log it and serve the offline page
          console.log('[SW] Fetch failed; serving offline page:', err);
          const cache = await caches.open(CACHE_NAME);
          return cache.match(OFFLINE_URL);
        }
      })()
    );
  }
  // All other requests fall back to default handling
});
