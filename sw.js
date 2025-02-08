const CACHE_NAME = 'hebcal-v1';
const BASE_URL = self.location.origin;

const ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/manifest.json',
    '/icons/icon-192.png',
    '/icons/icon-512.png',
    '/tables/tables.xlsx',
    '/lib/xlsx.full.min.js',
    '/lib/he.js',
    '/lib/hebcal-core.min.js'
];

// התקנת Service Worker
self.addEventListener('install', event => {
    console.log('[Service Worker] Installing');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[Service Worker] Caching assets');
                return cache.addAll(ASSETS);
            })
    );
});

// הפעלת Service Worker
self.addEventListener('activate', event => {
    console.log('[Service Worker] Activating');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(cacheName => cacheName !== CACHE_NAME)
                    .map(cacheName => caches.delete(cacheName))
            );
        })
    );
});

// טיפול בבקשות
self.addEventListener('fetch', event => {
    // התעלם מבקשות Vite
    if (event.request.url.includes('/@vite') || 
        event.request.url.includes('/node_modules/') ||
        event.request.url.includes('ws://') ||
        event.request.url.includes('hmr')) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    console.log('[Service Worker] Serving from cache:', event.request.url);
                    return response;
                }

                return fetch(event.request)
                    .then(response => {
                        if (!response || response.status !== 200) {
                            console.log(`[Service Worker] Invalid response for: ${event.request.url}`);
                            return response;
                        }

                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                console.log('[Service Worker] Cached new resource:', event.request.url);
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    })
                    .catch(error => {
                        console.error('[Service Worker] Fetch failed:', error);
                        throw error;
                    });
            })
    );
});
