const cacheName = 'bazar-v1';
const staticAssets = [
  './',
  './index.html',
  './manifest.json'
];

// Install Event
self.addEventListener('install', async event => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
});

// Fetch Event (Offline support)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
