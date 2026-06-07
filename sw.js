const CACHE_NAME = 'alien-scanner-v1';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './icon.svg'
];

// Install the Service Worker and cache the files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opened cache');
            return cache.addAll(ASSETS);
        })
    );
});

// Intercept network requests and serve from cache if offline
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
