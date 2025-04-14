// Service Worker for TMS Dashboard
const CACHE_NAME = 'tms-dashboard-cache-v1';

// Assets to cache on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico'
];

// Font files to cache - these are now created as empty files in the public directory
const FONT_FILES = [
  // Font Awesome
  '/assets/fonts/fa-solid-900.woff2',
  '/assets/fonts/fa-solid-900.woff',
  '/assets/fonts/fa-solid-900.ttf',
  // Material UI Icons
  '/assets/fonts/material-icons.woff2',
  '/assets/fonts/material-icons-outlined.woff2',
  '/assets/fonts/material-icons-round.woff2',
  '/assets/fonts/material-icons-sharp.woff2',
  '/assets/fonts/material-icons-two-tone.woff2',
  // Roboto
  '/assets/fonts/roboto-v30-latin-regular.woff2',
  '/assets/fonts/roboto-v30-latin-500.woff2',
  '/assets/fonts/roboto-v30-latin-700.woff2'
];

// Icon files to cache
const ICON_FILES = [
  '/assets/icons/icon-72x72.png',
  '/assets/icons/icon-96x96.png',
  '/assets/icons/icon-128x128.png',
  '/assets/icons/icon-144x144.png',
  '/assets/icons/icon-152x152.png',
  '/assets/icons/icon-192x192.png',
  '/assets/icons/icon-384x384.png',
  '/assets/icons/icon-512x512.png'
];

// Install event - precache static assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing Service Worker...');
  // Skip waiting to ensure the new service worker activates immediately
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Opened cache:', CACHE_NAME);
        // First cache the basic assets
        return cache.addAll(PRECACHE_ASSETS)
          .then(() => {
            console.log('[Service Worker] Pre-cached basic assets');
            // Then try to cache font files
            return cache.addAll(FONT_FILES)
              .catch(err => {
                console.warn('[Service Worker] Some font files failed to cache:', err);
                // Continue even if some font files fail
                return Promise.resolve();
              });
          })
          .then(() => {
            console.log('[Service Worker] Pre-cached font files');
            // Then try to cache icon files
            return cache.addAll(ICON_FILES)
              .catch(err => {
                console.warn('[Service Worker] Some icon files failed to cache:', err);
                // Continue even if some icon files fail
                return Promise.resolve();
              });
          });
      })
  );
});

// Activate event - clean up old caches and take control immediately
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating Service Worker...');
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              console.log('[Service Worker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return Promise.resolve();
          })
        );
      })
      .then(() => {
        console.log('[Service Worker] Claiming clients');
        return self.clients.claim();
      })
  );
});

// Helper function to determine if a request is for a font file
function isFontRequest(url) {
  return (
    url.includes('/assets/fonts/') ||
    url.includes('.woff') ||
    url.includes('.woff2') ||
    url.includes('.ttf') ||
    url.includes('.otf')
  );
}

// Helper function to determine if a request is for an image file
function isImageRequest(url) {
  return (
    url.includes('/assets/icons/') ||
    url.endsWith('.png') ||
    url.endsWith('.jpg') ||
    url.endsWith('.jpeg') ||
    url.endsWith('.svg') ||
    url.endsWith('.gif') ||
    url.endsWith('.webp')
  );
}

// Fetch event - serve from cache or network with simplified strategy
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Skip service worker requests to avoid circular references
  if (event.request.url.includes('service-worker.js')) {
    return;
  }

  // Skip if method is not GET
  if (event.request.method !== 'GET') {
    return;
  }

  // For navigation requests (HTML pages) - network first, fallback to cache
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          console.log('[Service Worker] Fallback to cached index.html');
          return caches.match('/index.html');
        })
    );
    return;
  }

  // For font files - network first with cache fallback
  if (isFontRequest(event.request.url)) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Cache the successful response
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
          }
          return response;
        })
        .catch(() => {
          // If network fails, try the cache
          return caches.match(event.request);
        })
    );
    return;
  }

  // For static assets (JS, CSS, images) - stale-while-revalidate
  if (
    event.request.url.endsWith('.js') ||
    event.request.url.endsWith('.css') ||
    isImageRequest(event.request.url)
  ) {
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          // Return cached response immediately if available
          const fetchPromise = fetch(event.request)
            .then(networkResponse => {
              // Update cache with new response
              if (networkResponse && networkResponse.status === 200) {
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME)
                  .then(cache => {
                    cache.put(event.request, responseToCache);
                  });
              }
              return networkResponse;
            })
            .catch(() => {
              // If network fetch fails and we don't have a cached response, this will be null
              console.log('[Service Worker] Network request failed and no cache for', event.request.url);
              return null;
            });

          return cachedResponse || fetchPromise;
        })
    );
    return;
  }

  // For all other requests - network first, then cache
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Don't cache non-successful responses
        if (!response || response.status !== 200) {
          return response;
        }

        // Clone the response
        const responseToCache = response.clone();

        // Add to cache
        caches.open(CACHE_NAME)
          .then(cache => {
            cache.put(event.request, responseToCache);
          });

        return response;
      })
      .catch(() => {
        // If network request fails, try the cache
        return caches.match(event.request);
      })
  );
});
