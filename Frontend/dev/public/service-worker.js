const CACHE_NAME = 'DQIG_CACHE';
const toCache = [
    '/',
    '/js/main.min.js',
    '/css/styles.min.css',
    '/js/pwa.webmanifest',
    '/images/apple-touch.png',
    '/images/splash-screen.png',
    '/font/Barlow-Light.ttf',
    '/font/Barlow-Regular.ttf',
    'https://beibootapi.herokuapp.com/random?format=portrait',
    'https://beibootapi.herokuapp.com/random?format=landscape'
];

fetch('https://beibootapi.herokuapp.com/random?format=portrait').then(response => response.json()).then(data => {
    toCache.push(`https://beibootapi.herokuapp.com/image/${data.image}`);

});
fetch('https://beibootapi.herokuapp.com/random?format=landscape').then(response => response.json()).then(data => {
    toCache.push(`https://beibootapi.herokuapp.com/image/${data.image}`);
});


self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(toCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(cachedRequest => {
                if(cachedRequest){
                    return cachedRequest;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys()
            .then((keyList) => {
                return Promise.all(keyList.map((key) => {
                    if (key !== CACHE_NAME) {
                        console.log('[ServiceWorker] Removing old cache', key);
                        return caches.delete(key);
                    }
                }));
            })
            .then(() => self.clients.claim())
    );
});