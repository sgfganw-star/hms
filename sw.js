// تم تغيير الإصدار إلى v2 لإجبار المتصفح على تحديث الملفات
const CACHE_NAME = 'alarab-uni-v3';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './192.png',
  './512.png'
];

self.addEventListener('install', (event) => {
  // تخطي مرحلة الانتظار لتحديث التطبيق فوراً
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', (event) => {
  // مسح الكاش القديم (v1)
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
