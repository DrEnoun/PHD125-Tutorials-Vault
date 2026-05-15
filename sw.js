/* ════════════════════════════════════════════════
   PHD125 PWA Service Worker
   Update CACHE_VERSION when deploying new content
════════════════════════════════════════════════ */
const CACHE_VERSION = 'phd125-v1.0.0';
const STATIC_CACHE  = CACHE_VERSION + '-static';
const DATA_CACHE    = CACHE_VERSION + '-data';

// Core files to cache for offline use
const STATIC_FILES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];

// Tutorial data files — add new ones as you create them
const DATA_FILES = [
  '/data/tutorial-2.js',
  // '/data/tutorial-3.js',
  // '/data/tutorial-4.js',
];

/* ── INSTALL: cache all static + data assets ── */
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => cache.addAll(STATIC_FILES)),
      caches.open(DATA_CACHE).then(cache => cache.addAll(DATA_FILES)),
    ]).then(() => self.skipWaiting())
  );
});

/* ── ACTIVATE: clean up old caches ── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== STATIC_CACHE && k !== DATA_CACHE)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

/* ── FETCH: cache-first for static, network-first for data ── */
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Data files: network first, fall back to cache
  if (url.pathname.startsWith('/data/')) {
    event.respondWith(
      fetch(event.request)
        .then(res => {
          const clone = res.clone();
          caches.open(DATA_CACHE).then(c => c.put(event.request, clone));
          return res;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Static files: cache first
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(STATIC_CACHE).then(c => c.put(event.request, clone));
        }
        return res;
      });
    })
  );
});
