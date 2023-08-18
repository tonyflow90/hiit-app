<script>
  import { fade } from "svelte/transition";

  export let duration = 500;
  export let contentDuration = 250;
  export let size = 100;
  export let show = true;

  let width; //window.innerWidth;
  let height; //window.innerHeight;
  let rects = [];

  $: rectSize = size <= 100 ? 100 : size;
  $: x = Math.floor(width / rectSize);
  $: y = Math.floor(height / rectSize);
  $: rectDuration = duration / x / y || 0;
  $: if (width && height) rects = Array.apply(null, new Array(x * y));
  $: if (rects) rects.forEach(initRect);

  const initRect = (r, i) => {
    let rect = {
      width: 0,
      height: 0,
      position: { x: 0, y: 0 },
      delay: 0,
      duration: 0,
    };
    let px = Math.floor(i % x) + 1;
    let py = Math.floor(i / x) + 1;
    rect.width = width / x;
    rect.height = height / y;
    rect.position.x = (width / x) * Math.floor(i % x);
    rect.position.y = (height / y) * Math.floor(i / x);
    rect.duration = rectDuration;
    rect.delay = rectDuration * py * ((x * px) / x);
    rects[i] = rect;
  };
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />

{#if width && height}
  {#each rects as r, i}
    {#if show}
      <svg
        class="flex absolute top-0 right-0 z-40"
        viewBox="0 0 {width} {height}"
        out:fade={{
          delay: duration,
          duration: 0,
        }}
      >
        <rect
          out:fade={{
            delay: r.delay,
            duration: r.duration,
          }}
          class="fill-primary stroke-none"
          x={r.position.x}
          y={r.position.y}
          width={r.width + 1}
          height={r.height + 1}
        />
        <rect
          out:fade={{
            delay: r.delay,
            duration: r.duration,
          }}
          class="fill-accent opacity-5"
          x={r.position.x}
          y={r.position.y}
          width={r.width + 1}
          height={r.height + 1}
        />
      </svg>
    {/if}
  {/each}
  {#if show}
    <div
      class="flex justify-center items-center z-50 top-0 right-0 absolute w-full h-full bg-transparent"
      transition:fade={{ delay: 0, duration: contentDuration }}
    >
      <slot />
    </div>
  {/if}
{/if}
