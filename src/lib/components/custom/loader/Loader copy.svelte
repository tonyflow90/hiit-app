<script>
  import { onMount } from "svelte";
  import { fade, slide } from "svelte/transition";

  export let promise;
  export let text = "loading";
  export let icon = "Points";

  let iconComponent = undefined;

  onMount(async () => {
    iconComponent = (await import(`./icons/${icon}.svelte`)).default;
  });
</script>

{#await promise}
  <slot name="loading">
    <div
      class="flex justify-center items-center w-[100vw] h-[100vh] absolute top-0 left-0 bg-secondary-foreground animate-spin"
    >
      <p class="flex text-2xl text-primary-foreground font-bold">
        loading
        <span class="ml-2 w-12 h-12">
          {#if icon}
            <svelte:component this={iconComponent} />
          {/if}
        </span>
      </p>
    </div>
  </slot>
{:then result}
  <slot>
    <p>no slot data ...</p>
  </slot>
{:catch error}
  <slot name="fallback">
    <p>no fallback defined</p>
  </slot>
{/await}
