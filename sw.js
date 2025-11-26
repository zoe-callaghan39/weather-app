// Name of the cache where we store offline assets
const CACHE_NAME = 'offline-cache-v5';

// The offline page we want to serve when the user loses internet
const OFFLINE_URL = 'offline.html';

// A variable to store the offline page Response in memory
let offlineResponse = null;

// This event runs once when the service worker is installed
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      // Open our named cache
      const cache = await caches.open(CACHE_NAME);

      // Fetch the offline.html page fresh (not from browser cache)
      const resp = await fetch(OFFLINE_URL, { cache: 'no-cache' });
      const body = await resp.text();

      // Create a new Response object with appropriate headers
      const custom = new Response(body, {
        headers: { 'Content-Type': 'text/html; charset=UTF-8' },
      });

      // Save the offline.html page in the cache
      await cache.put(OFFLINE_URL, custom.clone());

      // Also store it in memory for quicker access later
      offlineResponse = custom;

      // Cache the images used in offline.html so they display properly
      await cache.addAll(['assets/h2.png', 'assets/h1.png', 'assets/rain.gif']);

      // Activate the service worker immediately without waiting for old versions to expire
      await self.skipWaiting();
    })()
  );
});

// This event runs when the service worker becomes active
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Get all existing cache keys
      const keys = await caches.keys();

      // Delete any old caches that don't match the current version
      await Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );

      // Take control of all client pages immediately
      await self.clients.claim();
    })()
  );
});

// This event intercepts all network requests the page makes
self.addEventListener('fetch', (event) => {
  // Handle page navigation (e.g. user refreshes or types in the address bar)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          // Try fetching the real page from the network
          return await fetch(event.request);
        } catch (err) {
          // If network fails (offline), serve the cached offline page
          return offlineResponse || caches.match(OFFLINE_URL);
        }
      })()
    );
    return;
  }

  // If the request is for one of the known offline asset images...
  if (
    event.request.url.includes('/assets/h2.png') ||
    event.request.url.includes('/assets/h1.png') ||
    event.request.url.includes('/assets/rain.gif')
  ) {
    event.respondWith(
      // Try to serve the cached version, otherwise fetch from network
      caches.match(event.request).then((cached) => {
        return cached || fetch(event.request);
      })
    );
  }
});
