console.log('sw_cached_site.js invoked');
var cacheName = 'wffweb-cache-dev-guide-v-1';

self.addEventListener('install', e => {
  // Perform install steps
  console.log('sw_cached_site.js install');
    
//  e.waitUntil(
//		    caches.open(cacheName)
//		      .then(cache => {
//		        console.log('sw caching files');
//		        cache.addAll(urlsToCache);
//		      })
//		      .then(() => self.skipWaiting())
//		  );
	
});


self.addEventListener('activate', e => {
	console.log('sw activated');
	// remove unwanted caches
	console.log('caches', caches);
	
	e.waitUntil(
			caches.keys().then(cacheNames => {
				return Promise.all(
						cacheNames.map(cache => {
							if(cache !== cacheName && cache !== 'wffweb-cache-v-1') {
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
	fetch(e.request).then(res => {
		// make copy/clone of response
		const resClone = res.clone();
		caches
		.open(cacheName)
		.then(cache => {
			// add response to cache
			cache.put(e.request, resClone);
		});
		return res;
	}).catch(err => caches.match(e.request).then(res => res))		
	)
});
