console.log('sw.js invoked');
var cacheName = 'wffweb-cache-v36';
var urlsToCache = [
  '/',
  '/assets/js/main.js',
  '/assets/js/jquery-3.3.1.min.js'
];

self.addEventListener('install', e => {
  // Perform install steps
  e.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        console.log('sw caching files');
        cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});


self.addEventListener('activate', e => {
	console.log('sw activated');
	// remove unwanted caches
	console.log('caches', caches);
	
	e.waitUntil(
			caches.keys().then(cacheNames => {
				return Promise.all(
						cacheNames.map(cache => {
							if(cache !== cacheName) {
								console.log('Service worker: clearing old cache');
								return caches.delete(cache);
							}
						}))
			})
			
			);
});

// fetch cached files
self.addEventListener('fetch', e => {
	console.log('sw fetch');
	e.respondWith(
	fetch(e.request).catch(() => caches.match(e.request))		
	)
});
