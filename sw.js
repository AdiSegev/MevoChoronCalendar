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
    // התעלם מבקשות Vite ודברים שאינם נחוצים
    if (event.request.url.includes('/@vite') || 
        event.request.url.includes('/node_modules/') ||
        event.request.url.includes('ws://') ||
        event.request.url.includes('hmr')) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                // אם יש תגובה בקאש, החזר אותה
                if (cachedResponse) {
                    return cachedResponse;
                }

                // נסה לקבל את המשאב מהרשת
                return fetch(event.request)
                    .then(networkResponse => {
                        // וודא שהתגובה תקינה
                        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                            return networkResponse;
                        }

                        // שכפל את התגובה לפני השמירה בקאש
                        const responseToCache = networkResponse.clone();
                        
                        // שמור בקאש באופן אסינכרוני
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            })
                            .catch(error => {
                                console.error('שגיאה בשמירת משאב בקאש:', error);
                            });

                        return networkResponse;
                    })
                    .catch(error => {
                        console.error('כישלון בקבלת משאב:', error);
                        
                        // נסה להחזיר דף אינדקס או תגובת שגיאה
                        return caches.match('/index.html')
                            .then(fallbackResponse => {
                                if (fallbackResponse) {
                                    return fallbackResponse;
                                }
                                
                                // אם אין דף אינדקס בקאש, החזר תגובת שגיאה
                                return new Response('לא ניתן לטעון את הדף. אנא בדוק את החיבור לאינטרנט.', {
                                    status: 503,
                                    statusText: 'Service Unavailable'
                                });
                            });
                    })
            })
    );
});
