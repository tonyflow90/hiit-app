import { vitePreprocess } from "@sveltejs/kit/vite";
import adapter from "@sveltejs/adapter-auto";

/** @type {import('@sveltejs/kit').Config}*/
const config = {
  kit: {
    adapter: adapter(),
    alias: {
      $lib: "./src/lib",
      "$lib/*": "./src/lib/*",
      $components: "src/lib/components",
      "$components/*": "src/lib/components/*",
      $stores: "src/lib/stores",
      "$stores/*": "src/lib/stores/*",
      $themes: "static/theme",
      "$themes/*": "static/theme/*",
    },
  },
  preprocess: [vitePreprocess({})],
  shadcn: {
    componentPath: "./src/lib/components/ui",
  },
};
export default config;
