<script>
  import { base } from "$app/paths";
  import { themes } from "./themes.js";

  export let theme = "default";

  if (window.matchMedia("(prefers-color-scheme)").media !== "not all") {
    console.info("🎉 Dark mode is supported");
  }

  if (theme == "default")
    theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  const setTheme = (theme) => {
    const currentTheme = document.documentElement.classList[0];
    if (currentTheme) document.documentElement.classList.remove(currentTheme);
    document.documentElement.classList.add(theme);
  };

  $: if (theme) setTheme(theme);
</script>

<svelte:head>
  <meta
    name="apple-mobile-web-app-status-bar-style"
    content="black-translucent"
  />
  <!-- <meta name="theme-color" content="hsl(24.3, 97.4%, 54.3%)" /> -->

  <meta
    name="color-scheme"
    content={theme === "default" ? "light dark" : theme}
  />
  <link rel="stylesheet" href={`${base}/theme/default.css`} />
  <link rel="stylesheet" href={`${base}/theme/${theme}.css`} />
</svelte:head>
