var myCache = 'myCache'

self.addEventListener("install", event => {
    console.log('Service Worker installé');

    //Mettre en cache les ressources statiques (les assets : html, css, js, fonts,...) du site.

    event.waitUntil(
        caches.open(myCache).then(function (cache) {
            return cache.addAll(
                [
                    '/',
                    '/bundle.js',
                    '/style.css'
                ]
            );
        })
    );



});


//Cache first
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        }),

        //Cache les ressources asynchrones
        caches.open(myCache).then(function (cache) {
            return cache.match(event.request).then(function (response) {
                return (
                    response ||
                    fetch(event.request).then(function (response) {
                        cache.put(event.request, response.clone());
                        return response;
                    })
                );
            });
        }),

    );
});

self.addEventListener('activate', (event) => {
    // On créer une tableau de caches à "whitelister"
    console.log('service activé !')
    var cacheWhitelist = [myCache]
    event.waitUntil(
        // On récupère l'ensemble des caches disponibles
        caches.keys().then(cacheNames => {
            return Promise.all(
                // On itère sur chacun des caches
                cacheNames.map(myCache => {
                    // Si il n'est pas whitelisté, on le supprimme
                    if (cacheWhitelist.indexOf(myCache) === -1) {
                        return caches.delete(myCache);
                    }
                })
            )
        })
    );

})



