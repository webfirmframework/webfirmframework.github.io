console.log('sw.js invoked');
var cacheName = 'wffweb-cache-v5';


self.addEventListener('install', e => {
  // Perform install steps
  console.log(sw_cached_site install'');
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
