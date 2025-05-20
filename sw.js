const CACHE_NAME = 'offline-cache-v5';
const OFFLINE_URL = 'offline.html';

let offlineResponse = null;

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      const resp = await fetch(OFFLINE_URL, { cache: 'no-cache' });
      const body = await resp.text();

      const custom = new Response(body, {
        headers: { 'Content-Type': 'text/html; charset=UTF-8' },
      });

      await cache.put(OFFLINE_URL, custom.clone());
      offlineResponse = custom;

      await self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          return await fetch(event.request);
        } catch (err) {
          return offlineResponse || caches.match(OFFLINE_URL);
        }
      })()
    );
  }
});
