const CACHE_NAME = 'roxy-checklist-v1';
const urlsToCache = [
    '/roxy-checklist/',
    '/roxy-checklist/index.html',
    '/roxy-checklist/manifest.json',
    '/roxy-checklist/icon-192x192.png',
    '/roxy-checklist/icon-512x512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
