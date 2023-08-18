/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-16108a29'], (function (workbox) { 'use strict';

  self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "_app/immutable/assets/0.afe07513.css",
    "revision": null
  }, {
    "url": "_app/immutable/assets/2.a5c04c87.css",
    "revision": null
  }, {
    "url": "_app/immutable/assets/dark-blue.5eeaf8a1.css",
    "revision": null
  }, {
    "url": "_app/immutable/assets/dark-green.80f7c5ff.css",
    "revision": null
  }, {
    "url": "_app/immutable/assets/dark-orange.18e26aac.css",
    "revision": null
  }, {
    "url": "_app/immutable/assets/dark.52c20f4d.css",
    "revision": null
  }, {
    "url": "_app/immutable/assets/default.34dee98d.css",
    "revision": null
  }, {
    "url": "_app/immutable/assets/light-green.5353b880.css",
    "revision": null
  }, {
    "url": "_app/immutable/assets/neon.1f718ea2.css",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/index.5e3a4e02.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/index.b10d45b6.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/paths.142cd225.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/preload-helper.a4192956.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/root.14140f10.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/scheduler.008d26b0.js",
    "revision": null
  }, {
    "url": "_app/immutable/chunks/singletons.64e4e591.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/app.92b092bf.js",
    "revision": null
  }, {
    "url": "_app/immutable/entry/start.ccadf12a.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/0.55cf5c84.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/1.5ff3abe7.js",
    "revision": null
  }, {
    "url": "_app/immutable/nodes/2.49bff89e.js",
    "revision": null
  }, {
    "url": "_app/immutable/workers/timer-fd618b32.js",
    "revision": null
  }, {
    "url": "favicon.ico",
    "revision": "c5061b561531ac9a7ac01580196f8810"
  }, {
    "url": "favicon.png",
    "revision": "3a387408ecc6cc283f724b39ca5fffb4"
  }, {
    "url": "logo.png",
    "revision": "a36158ac1466c2fb8119bba49964a1d5"
  }, {
    "url": "logo.svg",
    "revision": "ca303e44eaab6e60b15176ca02d0e271"
  }, {
    "url": "registerSW.js",
    "revision": "1872c500de691dce40960bb85481de07"
  }, {
    "url": "service-worker.js",
    "revision": "68b329da9893e34099c7d8ad5cb9c940"
  }, {
    "url": "theme/dark-blue.css",
    "revision": "abaa092ad58426a013b9d6adb43320ac"
  }, {
    "url": "theme/dark-green.css",
    "revision": "7fb9b3f2d25a1896fb220b76dd63a7d8"
  }, {
    "url": "theme/dark-orange.css",
    "revision": "14389eafe688d39a0eb171b6d532d742"
  }, {
    "url": "theme/dark.css",
    "revision": "96617d245aa234a55121f68a4b3673ff"
  }, {
    "url": "theme/default.css",
    "revision": "d2c6e0254d1b93c8fa70d24e21a582f3"
  }, {
    "url": "theme/light-green.css",
    "revision": "60098fd703b7d90da28933ff9895fab2"
  }, {
    "url": "theme/light.css",
    "revision": "0a53c0557b17db4335814012c814152a"
  }, {
    "url": "theme/neon.css",
    "revision": "8fce3734dc2d9cd4948815230d23cb2a"
  }, {
    "url": "theme/purple.css",
    "revision": "e068ce5e6cefdeab1715379da68b517a"
  }, {
    "url": "timer.svg",
    "revision": "25b3a0df30ac3eabd94c02e59bca2a89"
  }, {
    "url": "/hiit-app/",
    "revision": "1c3bae217d781964a9ef2958bfe790f6"
  }, {
    "url": "manifest.webmanifest",
    "revision": "20312491d2547a7dfb179ee71fd8ead2"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("/hiit-app/")));

}));
