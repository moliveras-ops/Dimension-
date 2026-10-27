const CACHE='medidor-foto-v32';
const SHELL=['./','index.html','manifest.json','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))));self.clients.claim();});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
  e.respondWith((e.request.mode==='navigate'||e.request.url.endsWith('.html')?fetch(e.request.url,{cache:'no-cache',credentials:'same-origin'}):fetch(e.request)).then(res=>{
    if(res.ok&&(e.request.url.startsWith(self.location.origin)||e.request.url.includes('fonts.g')||e.request.url.includes('cdn.jsdelivr.net'))){const cp=res.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));}
    return res;}).catch(()=>caches.match(e.request).then(r=>r||caches.match('index.html'))));});
