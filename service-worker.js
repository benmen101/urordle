/* Urordle service worker — basic offline cache */
const CACHE_NAME = 'urordle-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/data/cases.js',
  '/manifest.json',
  '/icons/icon.svg',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Network-first for HTML so updates land quickly
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(
      fetch(request).then(res => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(request, copy)).catch(() => {});
        return res;
      }).catch(() => caches.match(request).then(m => m || caches.match('/index.html')))
    );
    return;
  }

  // Cache-first for static assets
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(res => {
        if (!res || res.status !== 200 || res.type !== 'basic') return res;
        const copy = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(request, copy)).catch(() => {});
        return res;
      }).catch(() => cached);
    })
  );
});
