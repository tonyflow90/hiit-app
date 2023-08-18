<script>
  import { Toaster } from "svelte-french-toast";
  import { settings } from "$stores/stores";

  import "../app.postcss";
  import Darkmode from "$components/custom/darkmode/Darkmode.svelte";

  let show = false;
  const startUpTime = 1000;

  onMount(async () => {
    show = true;
    setTimeout(() => (show = false), startUpTime);
  });
  import Logo from "$components/custom/images/Logo.svelte";
  import { onMount } from "svelte";
  import Background from "$components/custom/images/Background.svelte";
  import Theme from "$components/custom/theme/Theme.svelte";
  import ThemeSwitch from "$components/custom/theme/ThemeSwitch.svelte";
</script>

{#await settings.init() then}
  <Theme bind:theme={$settings.theme.value} />
  <!-- <ThemeSwitch bind:currentTheme={$settings.theme.value} /> -->
{/await}

<Toaster />

<Background size={100} duration={500} {show}>
  <div class="flex flex-col justify-center items-center">
    <Logo duration={500} />
    <p class="flex text-2xl text-accent font-bold animate-ping delay-1500">
      loading
    </p>
  </div>
</Background>

<main
  class="flex flex-col justify-center bg-primary min-h-screen min-w-full text-secondary"
>
  {#if !show}
    <slot />
  {/if}
</main>
