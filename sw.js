const CACHE = 'v2';
const CDN = ['cdn.tailwindcss.com', 'fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.add('/')).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const { hostname } = new URL(e.request.url);
  if (CDN.includes(hostname)) {
    e.respondWith(
      caches.open(CACHE).then(c =>
        c.match(e.request).then(cached => {
          const fresh = fetch(e.request).then(r => { c.put(e.request, r.clone()); return r; });
          return cached ? (fresh.catch(() => {}), cached) : fresh;
        })
      )
    );
    return;
  }
  if (e.request.mode === 'navigate') {
    e.respondWith(
      caches.open(CACHE).then(c =>
        fetch(e.request).then(r => { c.put('/', r.clone()); return r; })
          .catch(() => c.match('/'))
      )
    );
  }
});
