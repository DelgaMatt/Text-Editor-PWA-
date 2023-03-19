const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate} = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
registerRoute(
  // Check to see if the request's destination is style for stylesheets, script for JavaScript, or worker for web worker   
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination), 
  // Use a Stale While Revalidate caching strategy 
  new StaleWhileRevalidate({
    // Put all cached files in a cache named 'assets'     
    cacheName: 'asset-cache',
    plugins: [
      // Ensure that only requests that result in a 200 status are cached       
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

