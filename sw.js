const CACHE_NAME = 'hebcal-v3';

// רשימת הקבצים הבסיסיים שבטוח קיימים
const CORE_ASSETS = [
    './index.html',
    './styles.css',
    './app.js',
    './manifest.json',
    './lib/he.js',
    './lib/hebcal-core.js',
    './lib/hebcal-core.min.js',
    './lib/xlsx.full.min.js',
    './icons/icon-192.png',
    './icons/icon-512.png',
    './favicon.ico'
];

// מיפוי URL חיצוניים לקבצים מקומיים
const URL_MAPPING = {
    '/': './index.html',
    '/index.html': './index.html'
};

// פונקציה לטעינת אייקון
async function fetchAndCacheIcon(request, iconUrl) {
    try {
        const response = await fetch(iconUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, response.clone());
        return response;
    } catch (error) {
        console.error('Error fetching icon:', error);
        return new Response('Icon not found', { status: 404 });
    }
}

// התקנת Service Worker
self.addEventListener('install', event => {
    console.log('[Service Worker] Installing');
    self.skipWaiting();
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[Service Worker] Caching core assets');
                return Promise.all(
                    CORE_ASSETS.map(async asset => {
                        try {
                            const response = await fetch(asset);
                            if (response.ok) {
                                await cache.put(asset, response);
                                console.log(`[Service Worker] Cached: ${asset}`);
                            } else {
                                console.warn(`[Service Worker] Failed to cache: ${asset}`);
                            }
                        } catch (error) {
                            console.warn(`[Service Worker] Error caching ${asset}:`, error);
                        }
                    })
                );
            })
    );
});

// הפעלת Service Worker
self.addEventListener('activate', event => {
    console.log('[Service Worker] Activating');
    event.waitUntil(
        Promise.all([
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames
                        .filter(cacheName => cacheName !== CACHE_NAME)
                        .map(cacheName => {
                            console.log(`[Service Worker] Deleting old cache: ${cacheName}`);
                            return caches.delete(cacheName);
                        })
                );
            }),
            clients.claim()
        ])
    );
});

// טיפול בבקשות
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    
    // בדיקה אם יש מיפוי URL לקובץ מקומי
    const mappedPath = URL_MAPPING[url.pathname] || URL_MAPPING[event.request.url];
    if (mappedPath) {
        event.respondWith(
            caches.match(mappedPath)
                .then(response => {
                    if (response) {
                        console.log(`[Service Worker] Returning mapped file: ${mappedPath}`);
                        return response;
                    }
                    console.warn(`[Service Worker] Mapped file not found: ${mappedPath}`);
                    return fetch(event.request);
                })
        );
        return;
    }

    // טיפול בשאר הבקשות
    event.respondWith(
        caches.match(event.request)
            .then(async response => {
                if (response) {
                    return response;
                }

                try {
                    const networkResponse = await fetch(event.request);
                    if (networkResponse.ok) {
                        const cache = await caches.open(CACHE_NAME);
                        await cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    }
                } catch (error) {
                    console.error(`[Service Worker] Fetch failed for ${event.request.url}:`, error);
                }

                return new Response('Resource not found', { 
                    status: 404,
                    headers: {
                        'Content-Type': 'text/plain',
                        'X-Debug-Info': `Failed to fetch: ${event.request.url}`
                    }
                });
            })
    );
});
