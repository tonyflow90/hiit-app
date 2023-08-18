<script>
  import { Pause, Play, RotateCcw } from "lucide-svelte";
  import { Button } from "$components/ui/button";
  import Test from "$components/custom/images/Test.svelte";
  import Countdown from "$components/Timer/Countdown.svelte";

  let notification;

  let timer;
  let time = 0;
  export let pauseIsRunning = false;
  export let running = false;
  let paused = false;

  export let item;
  export let activeStep = 0;

  const run = async () => {
    timer.reset();
    pauseIsRunning = false;
    activeStep = 0;
    let step = item.steps[activeStep];
    time = step.duration;
    timer.start();
  };

  const pause = async () => {
    timer.pause();
  };

  const resume = async () => {
    timer.resume();
  };

  const reset = async () => {
    timer.reset();
    pauseIsRunning = false;
    activeStep = 0;
    time = 0;
  };

  const update = async () => {
    pauseIsRunning = !pauseIsRunning;
    if (!pauseIsRunning) activeStep++;
    if (activeStep > item.steps.length - 1) {
      notification.show();
      return;
    }
    if (pauseIsRunning) {
      time = item.pause_duration;
      timer.start();
    } else {
      let step = item.steps[activeStep];
      time = step.duration;
      timer.start();
    }
  };
</script>

<Test
  class="w-[50vh] h-[50vh] transition-all duration-300 fill-muted {running
    ? 'fill-accent'
    : ''}
          {pauseIsRunning ? 'fill-destructive ' : ''}"
  running={true}
>
  <div class="flex flex-col items-center">
    <Countdown
      class="text-4xl transition duration-500 font-bold mb-6 {paused
        ? 'animate-pulse'
        : ''}"
      bind:this={timer}
      {time}
      bind:running
      bind:paused
      on:finished={update}
    />

    {#if !running}
      <Button variant="ghost" class="w-14 h-14 mt-4 p-0 m-0" on:click={run}>
        <Play class="w-14 h-14 ml-2" />
      </Button>
    {:else if running && paused}
      <div class="flex flex-row mt-4">
        <Button variant="ghost" class="w-14 h-14 p-0 m-0" on:click={resume}>
          <Play class="w-14 h-14 ml-2" />
        </Button>
        <Button variant="ghost" class="w-14 h-14 p-0 m-0" on:click={reset}>
          <RotateCcw class="w-12 h-12" />
        </Button>
      </div>
    {:else}
      <Button
        variant="ghost"
        class="w-14 h-14 mt-4 p-0 m-0"
        on:click={() => pause()}
      >
        <Pause class="w-14 h-14" />
      </Button>
    {/if}
  </div>
</Test>
