const CACHE_NAME = "chat_v1"; //increment this when updating website
const urlsToCache = [
  'index.php'
];

const self = this;

// Install SW
self.addEventListener("install", (event) => {
  // start caching assets
  console.log("Installing service worker...");
  event.waitUntil(
    // open a new cache space
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Service Worker Installed!!");

      return cache.addAll(urlsToCache);
    })
  );
});

// Listen for requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match("index.php"));
    })
  );
});

// Activate the SW
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    // delete any other cache which is not the current version
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
