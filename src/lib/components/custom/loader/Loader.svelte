<script>
  import { onMount } from "svelte";

  export let text = "loading";
  export let icon = "Points";

  let iconComponent = undefined;

  onMount(async () => {
    iconComponent = (await import(`./icons/${icon}.svelte`)).default;
  });
</script>

<p class="flex text-2xl text-primary font-bold">
  <slot>
    <p>loading</p>
  </slot>
  <span class="text-primary ml-2 w-12 h-12">
    {#if icon}
      <svelte:component this={iconComponent} />
    {/if}
  </span>
</p>
