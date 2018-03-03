var cacheName = 'helloWorld';     // 缓存的名称
// install 事件，它发生在浏览器安装并注册 Service Worker 时
/*var cacheName = "chat-cache-name";*/
var cacheFiles = [
    "/",
    "/index.html",
    "/111.jpg",
    "/2.jpg"
];
/* "/mdl/bower.json","/mdl/bower.json",
    "/script/main.js", */
self.addEventListener("install", function(e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(caches.open(cacheName).then(function(cache) {
        console.log('is installed');
        return cache.addAll(cacheFiles);
    }));
});
self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
      caches.keys().then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== cacheName) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
    );
    return self.clients.claim();
  });
/**
为 fetch 事件添加一个事件监听器。接下来，使用 caches.match() 函数来检查传入的请求 URL 是否匹配当前缓存中存在的任何内容。如果存在的话，返回缓存的资源。
如果资源并不存在于缓存当中，通过网络来获取资源，并将获取到的资源添加到缓存中。
*/
self.addEventListener("fetch", function(e) {
    e.respondWith(caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
    }));
});
