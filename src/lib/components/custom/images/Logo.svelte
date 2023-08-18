<script>
  import { onMount } from "svelte";
  import { quintOut } from "svelte/easing";
  import { draw, fade } from "svelte/transition";

  import { hi, it } from "./logoshape.js";

  export let animate = false;
  export let duration = 1000;
  let show = false;

  onMount(() => {
    show = true;
    // setTimeout(() => (show = false), duration);
  });
</script>

{#if show}
  <div
    class="flex flex-row w-64"
    out:fade={{ delay: 0, duration: duration }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="3.33333in"
      height="3.33333in"
      viewBox="0 0 1000 1000"
    >
      <path
        transition:draw={{ delay: 0, duration: duration / 3 }}
        class="stroke-2 stroke-accent fill-none"
        d={hi}
      />

      <path
        in:fade={{ delay: (duration / 3) * 2, duration: duration / 3 }}
        class="fill-accent"
        d={hi}
      />
    </svg>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="3.33333in"
      height="3.33333in"
      viewBox="0 0 1000 1000"
    >
      <path
        transition:draw={{ delay: duration / 3, duration: duration / 3 }}
        class="stroke-2 stroke-accent fill-none"
        d={it}
      />

      <path
        in:fade={{ delay: (duration / 3) * 2, duration: duration / 3 }}
        class="fill-accent"
        d={it}
      />
    </svg>
  </div>
{/if}
