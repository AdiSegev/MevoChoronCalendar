// מספר גרסה - שנה אותו כשאתה רוצה לאלץ עדכון
const VERSION = '1.0.32';
const CACHE_NAME = `hebcal-${VERSION}`;

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
    "./screenshots/mobile.png",
    "./screenshots/desktop.png",
    './icons/web-app-manifest-144x144.png',
    './icons/web-app-manifest-192x192.png',
    './icons/web-app-manifest-512x512.png',
    './icons/favicon.ico',
    './icons/favicon-96x96.png',
    './icons/favicon.svg',
    './icons/apple-touch-icon.png',
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
    console.log('[Service Worker] Installing new version:', VERSION);
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {

            // מחק את המטמון הקודם לפני שמירת הקבצים החדשים
            return cache.keys().then(requests =>
                Promise.all(requests.map(request => cache.delete(request)))
            ).then(() => {
                // שמור את הקבצים החדשים
                return cache.addAll(CORE_ASSETS.map(asset => {
                    return new Request(asset, { cache: 'no-cache' });
                }));
            });
        })
    );
});


// הפעלת Service Worker
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
        }).then(() => {
            return clients.claim();
        })
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

// האזנה להודעות
self.addEventListener('message', event => {
    if (event.data.type === 'SKIP_WAITING') {
        console.log('[Service Worker] Skip waiting and activate new version');
        self.skipWaiting();
    } else if (event.data.type === 'GET_VERSION') {
        console.log('[Service Worker] Sending version:', VERSION);
        event.ports[0].postMessage({
            type: 'VERSION',
            version: VERSION
        });
    }
});
