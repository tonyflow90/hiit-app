<script>
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import { tweened } from "svelte/motion";

  import Timer from "./timer.js?worker";

  const dispatch = createEventDispatcher();

  onMount(() => {
    timer = new Timer();
    timer.onmessage = (event) => {
      const { time: _time, isRunning, isPaused } = event.data;
      running = isRunning;
      paused = isPaused;
      remainingTime = time - _time;
    };
  });

  onDestroy(() => {
    if (timer) timer.terminate();
  });

  let timer = undefined;

  export let time = 0;
  export let running = false;
  export let paused = false;
  let remainingTime = time;

  export const start = () => {
    if (timer) timer.postMessage("start");
  };

  export const pause = () => {
    if (timer) timer.postMessage("pause");
  };

  export const resume = () => {
    if (timer) timer.postMessage("resume");
  };

  export const reset = () => {
    if (timer) timer.postMessage("reset");
  };

  $: if (remainingTime <= 0 && running) {
    timer.postMessage("stop");
    dispatch("finished");
  }

  $: seconds = Math.floor(
    remainingTime > 60 ? remainingTime % 60 : remainingTime
  );
  $: minutes = Math.floor(remainingTime > 60 ? (remainingTime / 60) % 60 : 0);
  $: hours = Math.floor(
    remainingTime / 60 > 60 ? (remainingTime / 3600) % 60 : 0
  );

  $: formatedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  let formatedTime = "--:--:--";

  import { cn } from "$lib/utils";

  let className = undefined;
  export { className as class };
</script>

<p class={cn("flex", className)} {...$$restProps}>
  {#if running}
    {formatedTime}
  {:else}
    --:--:--
  {/if}
</p>
