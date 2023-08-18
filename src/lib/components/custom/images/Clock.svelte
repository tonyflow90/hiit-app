<script>
  import { draw, fade } from "svelte/transition";

  export let show = true;
  export let duration = 1000;

  $: d = (duration * 1) / 5;
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  {#if show}
    <g in:fade={{ delay: 0, duration: d }}>
      <circle
        class="fill-primary stroke-accent"
        cx="256"
        cy="281.6"
        r="230.4"
        in:draw={{ delay: d, duration: d }}
      />
    </g>
    <g in:fade={{ delay: d * 2, duration: d }}>
      <path
        class="fill-accent stroke-primary"
        in:draw={{ delay: d * 3, duration: d }}
        d="M294.4,281.6a38.4,38.4,0,1,1-51.2-36.21v-79a12.8,12.8,0,1,1,25.6,0v79A38.41,38.41,0,0,1,294.4,281.6Z"
      />
    </g>
    <g in:fade={{ delay: d * 4, duration: d }}>
      <path
        class="cls-3"
        in:draw={{ delay: d * 5, duration: d }}
        d="M256,51.2a231.14,231.14,0,0,1,51.2,5.72V25.6A25.6,25.6,0,0,0,281.6,0H230.4a25.6,25.6,0,0,0-25.6,25.6V56.92A231.14,231.14,0,0,1,256,51.2Z"
      />
      <path
        class="cls-3"
        in:draw={{ delay: d * 5, duration: d }}
        d="M399.42,101.29,411.71,80a19.2,19.2,0,0,0-7-26.23L374.39,36.29a19.2,19.2,0,0,0-26.23,7l-12.68,22A230,230,0,0,1,399.42,101.29Z"
      />
      <path
        class="cls-3"
        in:draw={{ delay: d * 5, duration: d }}
        d="M112.58,101.29a230,230,0,0,1,63.93-36l-12.68-22a19.2,19.2,0,0,0-26.23-7L107.32,53.78a19.2,19.2,0,0,0-7,26.23Z"
      />
    </g>
  {/if}
</svg>
