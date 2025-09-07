console.log('sw_cached_site.js invoked');
var cacheName = 'wffweb-cache-v113';


var urlsToCache = [
"/developers-guide-wffweb-12/css-properties.html",  
  "/developers-guide-wffweb-12/get-started.html",
  "/developers-guide-wffweb-12/custom-attributes.html",
  "/developers-guide-wffweb-12/custom-css-properties.html",
  "/developers-guide-wffweb-12/custom-server-methods.html",
  "/developers-guide-wffweb-12/custom-tags.html",
  "/developers-guide-wffweb-12/event-attributes.html",
  "/developers-guide-wffweb-12/execute-browser-page-action.html",
  "/developers-guide-wffweb-12/execute-javascript-from-server.html",
  "/developers-guide-wffweb-12/faq.html",
  "/developers-guide-wffweb-12/features-of-sharedtagcontent-class.html",
  "/developers-guide-wffweb-12/features-of-tags.html",
  "/developers-guide-wffweb-12/get-started.html",
  "/developers-guide-wffweb-12/how-to-resolve-dependency-in-build-tools.html",
  "/developers-guide-wffweb-12/mltp-design-pattern.html",
  "/developers-guide-wffweb-12/multi-threading-in-wff-java-code.html",
  "/developers-guide-wffweb-12/tag-attributes.html",
  "/developers-guide-wffweb-12/tagrepository.html",
  "/developers-guide-wffweb-12/tags-and-attributes.html",
  "/developers-guide-wffweb-12/wffweb-best-practices.html",
  "/developers-guide-wffweb-12/wffweb-configurations.html",
  "/developers-guide-wffweb-12/wffweb-current-features-and-future-plans.html",
  "/developers-guide-wffweb-12/wffweb-released-versions.html",
  "/developers-guide-wffweb-12/url-rewriting-url-routing.html",
  "/developers-guide-wffweb-12/new-features-in-wffweb-12.html",
  "/developers-guide-wffweb-12/developers-guide-uris.json",
  "/developers-guide-wffweb-12/common-uris.json",
  "/developers-guide-wffweb-12/developers-guide-uris.json",
  "/developers-guide-wffweb-12/common-uris.json",
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
