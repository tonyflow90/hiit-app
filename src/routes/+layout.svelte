<script>
  import { Toaster } from "svelte-french-toast";
  import { settings } from "$stores/stores";

  import "../app.postcss";

  let show = false;
  const startUpTime = 1000;

  onMount(async () => {
    show = true;
    setTimeout(() => (show = false), startUpTime);
  });
  import Logo from "$components/custom/logo/Logo.svelte";
  import { onMount } from "svelte";
  import Background from "$components/custom/SplashScreen.svelte";
  import Theme from "$components/custom/theme/Theme.svelte";

  import { pwaInfo } from "virtual:pwa-info";

  $: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : "";
</script>

<svelte:head>
  {@html webManifestLink}
</svelte:head>


{#await settings.init() then}
  <Theme bind:theme={$settings.theme.value} />

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
    class="flex flex-col justify-center min-h-screen min-w-full"
  >
    {#if !show}
      <slot />
    {/if}
  </main>
{/await}
