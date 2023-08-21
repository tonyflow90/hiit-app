const e = /* @__PURE__ */ location.pathname.split("/").slice(0, -1).join("/"), l = [
  e + "/_app/immutable/entry/app.d5e06bf0.js",
  e + "/_app/immutable/assets/0.2022c9bc.css",
  e + "/_app/immutable/nodes/0.beb329c0.js",
  e + "/_app/immutable/nodes/1.a63de467.js",
  e + "/_app/immutable/assets/2.a5c04c87.css",
  e + "/_app/immutable/nodes/2.70cee93e.js",
  e + "/_app/immutable/chunks/index.daee77df.js",
  e + "/_app/immutable/chunks/paths.aef9a52f.js",
  e + "/_app/immutable/chunks/preload-helper.a4192956.js",
  e + "/_app/immutable/chunks/scheduler.340a51ff.js",
  e + "/_app/immutable/chunks/singletons.be9a0d65.js",
  e + "/_app/immutable/chunks/themes.04a552d0.js",
  e + "/_app/immutable/entry/start.2e272bc1.js",
  e + "/_app/immutable/assets/dark-blue.5eeaf8a1.css",
  e + "/_app/immutable/assets/dark-green.80f7c5ff.css",
  e + "/_app/immutable/assets/dark-orange.18e26aac.css",
  e + "/_app/immutable/assets/dark.52c20f4d.css",
  e + "/_app/immutable/assets/default.9e3927ef.css",
  e + "/_app/immutable/assets/light-green.5353b880.css",
  e + "/_app/immutable/assets/neon.1f718ea2.css"
], m = [
  e + "/.nojekyll",
  e + "/favicon.ico",
  e + "/favicon.png",
  e + "/logo.png",
  e + "/logo.svg",
  e + "/robots.txt",
  e + "/theme/dark-blue.css",
  e + "/theme/dark-green.css",
  e + "/theme/dark-orange.css",
  e + "/theme/dark.css",
  e + "/theme/default.css",
  e + "/theme/light-green.css",
  e + "/theme/light.css",
  e + "/theme/neon.css",
  e + "/theme/purple.css",
  e + "/timer.svg"
], u = "1692658253318", i = `cache-${u}`, p = [
  ...l,
  // the app itself
  ...m
  // everything in `static`
];
self.addEventListener("install", (s) => {
  async function t() {
    await (await caches.open(i)).addAll(p);
  }
  s.waitUntil(t());
});
self.addEventListener("activate", (s) => {
  async function t() {
    for (const a of await caches.keys())
      a !== i && await caches.delete(a);
  }
  s.waitUntil(t());
});
self.addEventListener("fetch", (s) => {
  if (s.request.method !== "GET")
    return;
  async function t() {
    const a = new URL(s.request.url), c = await caches.open(i);
    if (p.includes(a.pathname))
      return c.match(a.pathname);
    try {
      const n = await fetch(s.request);
      return n.status === 200 && c.put(s.request, n.clone()), n;
    } catch {
      return c.match(s.request);
    }
  }
  s.respondWith(t());
});
