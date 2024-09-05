var CACHE_NAME = 'SettiSokutei-caches';
var urlsToCache = [
    '/TIZU4/index.css',
    '/TIZU4/index.html',

    '/TIZU4/easy-button.css',
    '/TIZU4/easy-button.js',

    '/TIZU4/t.js',
    '/TIZU4/T.css'
];

// インストール処理
self.addEventListener('install', function(event) {
	event.waitUntil(
		caches
			.open(CACHE_NAME)
			.then(function(cache) {
				return cache.addAll(urlsToCache);
			})
	);
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches
			.match(event.request)
			.then(function(response) {
				return response ? response : fetch(event.request);
			})
	);
});
