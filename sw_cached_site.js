console.log('sw_cached_site.js invoked');
var cacheName = 'wffweb-cache-v54';


var urlsToCache = [
"/developers-guide-wffweb-3/css-properties.html",  
  "/developers-guide-wffweb-3/get-started.html",
  "/developers-guide-wffweb-3/custom-attributes.html",
  "/developers-guide-wffweb-3/custom-css-properties.html",
  "/developers-guide-wffweb-3/custom-server-methods.html",
  "/developers-guide-wffweb-3/custom-tags.html",
  "/developers-guide-wffweb-3/event-attributes.html",
  "/developers-guide-wffweb-3/execute-browser-page-action.html",
  "/developers-guide-wffweb-3/execute-javascript-from-server.html",
  "/developers-guide-wffweb-3/faq.html",
  "/developers-guide-wffweb-3/features-of-sharedtagcontent-class.html",
  "/developers-guide-wffweb-3/features-of-tags.html",
  "/developers-guide-wffweb-3/get-started.html",
  "/developers-guide-wffweb-3/how-to-resolve-dependency-in-build-tools.html",
  "/developers-guide-wffweb-3/mltp-design-pattern.html",
  "/developers-guide-wffweb-3/multi-threading-in-wff-java-code.html",
  "/developers-guide-wffweb-3/tag-attributes.html",
  "/developers-guide-wffweb-3/tagrepository.html",
  "/developers-guide-wffweb-3/tags-and-attributes.html",
  "/developers-guide-wffweb-3/wffweb-best-practices.html",
  "/developers-guide-wffweb-3/wffweb-configurations.html",
  "/developers-guide-wffweb-3/wffweb-current-features-and-future-plans.html",
  "/developers-guide-wffweb-3/wffweb-released-versions.html",
  "/developers-guide-wffweb-3/developers-guide-uris.json",
  "/developers-guide-wffweb-3/common-uris.json",
  "/index.html",
  "/favicon.ico",
  "/common-uris.json"
];

self.addEventListener('install', e => {
  // Perform install steps
  console.log('sw_cached_site.js install');
  for (var i = 0; i < urlsToCache.length; i++) {
	  const uri = urlsToCache[i];
	  fetch(uri).then(res => {
			// make copy/clone of response
			const resClone = res.clone();
			caches
			.open(cacheName)
			.then(cache => {
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

//fetch cached files
self.addEventListener('fetch', function(event) {
	  event.respondWith(
	    caches.open(cacheName).then(function(cache) {
	      return cache.match(event.request).then(function (response) {
	        return response || fetch(event.request).then(function(response) {
	          cache.put(event.request, response.clone());
	          return response;
	        });
	      });
	    })
	  );
	});
