import { vitePreprocess } from "@sveltejs/kit/vite";
// import adapter from "@sveltejs/adapter-auto";
import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config}*/
const config = {
  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter(),
    paths: {
      base:
        process.env.NODE_ENV === "production" ? "/hiit-app" : "",
    },
    alias: {
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
