// sw.js
const cacheName = "butterfly-app-v1";
const filesToCache = [
  "/webdevA2/",
  "/webdevA2/index.html",
  "/webdevA2/style.css",
  "/webdevA2/main.js",
  "/webdevA2/photo/icon-192x192.png",
  "/webdevA2/photo/icon-512x512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});