const CACHE_NAME = 'grocery-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://i.postimg.cc/j57H1PP8/file-0000000062fc7208bcb58f5264a5b1d7.png'
];

// इंस्टॉल इवेंट - फाइलों को कैश करना
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// एक्टिवेट इवेंट - पुरानी कैश हटाना
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// फेच इवेंट - ऑफलाइन होने पर कैश से फाइल देना
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
