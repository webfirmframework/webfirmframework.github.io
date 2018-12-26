console.log('main.js invoked');
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw_cached_site.js')
  .then(function(registration) {
    console.log('Registration successful, scope is:', registration.scope);
  })
  .catch(function(error) {
    console.log('Service worker registration failed, error:', error);
  });
  
  navigator.serviceWorker.register('/developers-guide-wffweb-3/sw_cached_site.js')
  .then(function(registration) {
    console.log('Registration successful, scope is:', registration.scope);
  })
  .catch(function(error) {
    console.log('Service worker registration failed, error:', error);
  });
}