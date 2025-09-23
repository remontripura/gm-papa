// Only essential PWA support (no big cache)
self.addEventListener('install', (event) => {
  console.log('Service Worker installed');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated');
  self.clients.claim();
});

// Optional: minimal fetch listener
self.addEventListener('fetch', (event) => {
  // You can handle offline fallback here if needed
});
