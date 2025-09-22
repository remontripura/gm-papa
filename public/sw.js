import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

// ✅ Precache only essential files (minimal)
precacheAndRoute([
  { url: '/manifest.json', revision: '1' },
  { url: '/favicon.ico', revision: '1' },
  { url: '/logo.png', revision: '1' }, // optional, small size
]);

// ✅ Runtime caching for JS/CSS (network-first or stale)
registerRoute(
  /\.(?:js|css)$/,
  new NetworkFirst({
    cacheName: 'static-resources',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 0, // basically no cache
      }),
    ],
  })
);
// ✅ Runtime caching for images (small limit)
registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif)$/,
  new StaleWhileRevalidate({
    cacheName: 'image-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 5,           // only a few images
        maxAgeSeconds: 24 * 60 * 60,
      }),
    ],
  })
);