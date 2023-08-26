<script>
  import { onMount } from "svelte";
  import { quintOut } from "svelte/easing";
  import { draw, fade } from "svelte/transition";

  import { hi, it } from "$components/custom/logo/logoshape.js";

  export let duration = 1000;
  export let size = "3.33333in";
  let show = false;

  onMount(() => {
    show = true;
  });
</script>

{#if show}
  <div
    class="flex flex-row"
    out:fade={{ delay: 0, duration: duration }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
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
      width={size}
      height={size}
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
