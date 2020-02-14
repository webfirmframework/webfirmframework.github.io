console.log('sw_cached_site.js invoked');
var cacheName = 'wffweb-dev-guide-cache-v10';


self.addEventListener('install', e => {
  // Perform install steps
  console.log('sw_cached_site.js install');
  
  var uris = [
	"/developers-guide-wffweb-3/css-properties.html",  
	  "/developers-guide-wffweb-3/get-started.html",
	  "/developers-guide-wffweb-3/faq.html"
  ];
  

  for (var i = 0; i < uris.length; i++) {
	  const uri = uris[i];
	  fetch(uri).then(res => {
			// make copy/clone of response
			const resClone = res.clone();
			caches
			.open(cacheName)
			.then(cache => {
				console.log('put response in cache', uri);
				// add response to cache
				cache.put(uri, resClone);
			});
			return res;
		}).catch(err => caches.match(e.request).then(res => res));
		
  }
  
	
	
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
