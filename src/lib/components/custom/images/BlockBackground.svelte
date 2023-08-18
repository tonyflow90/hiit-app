<script>
  import { cn } from "$lib/utils";
  import { flip } from "svelte/animate";
  import { quintOut } from "svelte/easing";
  import { draw, fade, blur } from "svelte/transition";

  /**
   * @type {string | number | boolean | import("clsx").ClassArray | import("clsx").ClassDictionary | null | undefined}
   */
  let className = undefined;
  export { className as class };

  export let show = false;
  export let duration = 1000;
  export let delay = 0;
  export let animation = "block";
  export let size = 100;

  let width; //window.innerWidth;
  let height; //window.innerHeight;
  $: x = Math.floor(width / size);
  $: y = Math.floor(height / size);
  $: blockDelay = duration / x / y || 0;
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />

{#if width && height}
  {#if animation === "block"}
    <svg
      class="flex absolute top-0 right-0 z-40"
      viewBox="0 0 {width} {height}"
    >
      {#if show}
        {#each new Array(y) as element, j}
          {#each new Array(x) as element, i}
            <rect
              out:draw={{
                delay: 250 + blockDelay * (i + 1) * (j + 1) + delay,
                duration,
              }}
              class="stroke-2 stroke-accent"
              x={(width / x) * i}
              y={(height / y) * j}
              width={width / x + 1}
              height={height / y + 1}
            />
            <rect
              out:fade={{ delay: blockDelay * i * j + delay, duration }}
              class="fill-primary"
              x={(width / x) * i}
              y={(height / y) * j}
              width={width / x + 1}
              height={height / y + 1}
            />
          {/each}
        {/each}
      {/if}
    </svg>
  {:else}
    <p>nothing</p>
  {/if}
  {#if show}
    <div
      class="flex justify-center items-center z-50 top-0 right-0 absolute w-full h-full bg-transparent"
      transition:fade={{ delay: 0, duration: 250 }}
    >
      <slot />
    </div>
  {/if}
{/if}
