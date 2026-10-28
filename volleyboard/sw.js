// VolleyBoard moved to /BaronsVolleyboard/. Clear the old cache and step aside.
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith('volleyboard-')).map(x=>caches.delete(x)))).then(()=>self.registration.unregister()));});
