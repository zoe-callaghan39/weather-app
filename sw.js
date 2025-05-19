// public/sw.js
const CACHE_NAME = 'offline-cache-v1';

// Dynamically compute the offline.html location relative to this SW file
const OFFLINE_URL = new URL('offline.html', self.location).href;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.add(OFFLINE_URL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Only intercept navigation requests (page loads)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => Response.redirect(OFFLINE_URL))
    );
  }
  // everything else (JS, CSS, images, API) just falls through
});
