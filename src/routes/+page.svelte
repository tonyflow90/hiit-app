<script>
  import { ArrowBigDown, ArrowBigRight, ArrowBigUp } from "lucide-svelte";

  import { Button, buttonVariants } from "$components/ui/button/index";
  import Notification from "$components/custom/notification/Notification.svelte";

  let notification;
  let isOpen = false;

  /**
   * @type {{ reset: () => void; start: () => void; pause: () => void; resume: () => void; }}
   */
  let timer;
  let time = 0;
  let pauseIsRunning = false;

  let running = false;

  let paused = false;

  onMount(() => {
    window.addEventListener("scroll", (evt) => {
      if (evt.currentTarget.pageYOffset >= 150) showScrollToTopButton = true;
      else showScrollToTopButton = false;
      showScrollToDetailButton = !showScrollToTopButton;
    });
  });

  const switchTraining = (/** @type {any} */ newItem) => {
    running = false;
    pauseIsRunning = false;
    selectedItem = newItem;
    isOpen = false;
    scrollToTop();
    showScrollToDetailButton = true;
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const scrollToElement = (/** @type {any} */ el) => {
    if (el) el.scrollIntoView(true);
  };

  import TimerUiInfo from "$components/custom/timer/ui/TimerUiInfo.svelte";
  import Timer from "$components/custom/timer/ui/TimerUi.svelte";
  import { fade, scale } from "svelte/transition";
  import { onMount } from "svelte";

  let activeStep = 0;

  let mainSection;
  let detailSection;
  let showScrollToTopButton = false;
  let showScrollToDetailButton = true;

  import Header from "$components/custom/Header.svelte";

  /**
   * @type {number | undefined}
   */
  let selectedTraining = undefined;

  /** @type {import('./$types').Snapshot<number>} */
  export const snapshot = {
    capture: () => selectedTraining,
    restore: (value) => (selectedTraining = value),
  };

  import { trainings, settings } from "$stores/stores";
  import { base } from "$app/paths";
  import SettingsDialog from "$components/custom/SettingsDialog.svelte";
  import TrainingSelect from "$components/custom/TrainingSelect.svelte";
  import Background from "$components/custom/timer/ui/Background.svelte";
  import Logo from "$components/custom/logo/Logo.svelte";
</script>

<svelte:head>
  <title>HIIT App</title>
  <meta name="description" content="HIIT App" />
</svelte:head>

<Notification bind:this={notification} />

<div class="flex flex-col w-full min-h-[100vh] items-center">
  <div class="flex flex-col flex-1 w-full max-w-2xl">
    <Header>
      <div>
        {#await trainings.init() then}
          <TrainingSelect bind:selectedTraining />
        {:catch error}
          <p>{error} ...</p>
        {/await}
      </div>
      <div slot="end">
        <div class="grid grid-flow-col gap-2">
          {#await settings.init() then}
            <SettingsDialog />
          {/await}
        </div>
      </div>
    </Header>

    <section
      bind:this={mainSection}
      id="main"
      class="flex flex-col w-full h-[90vh]"
    >
      {#if selectedTraining}
        <div
          class="flex flex-1 w-full items-center justify-center overflow-hidden"
        >
          <div
            in:scale={{ delay: 300, duration: 250 }}
            out:fade={{ delay: 0, duration: 250 }}
          >
            <Timer
              item={selectedTraining}
              bind:running
              bind:activeStep
              bind:pauseIsRunning
            />
          </div>
        </div>
        <div class="items-center justify-center p-8 pl-2 pr-2">
          <div
            in:fade={{ delay: 350, duration: 250 }}
            out:fade={{ delay: 0, duration: 250 }}
          >
            <TimerUiInfo
              item={selectedTraining}
              {running}
              {activeStep}
              {pauseIsRunning}
            />
          </div>
        </div>
      {:else}
        <div
          class="flex flex-col flex-1 w-full items-center justify-center overflow-hidden"
        >
          <p>Welcome to your HII Training</p>
          <Background running={true} class="max-w-full w-[50vh] h-[50vh]">
            <Logo duration={0} size="1.5in" />
          </Background>
          <div class="flex items-center justify-center pb-4">
            <a
              href="{base}/trainings"
              class={buttonVariants({ variant: "ghost" })}
            >
              <h1 class="flex flex-auto text-xl">show all trainings</h1>
              <ArrowBigRight class="flex m-2" />
            </a>
          </div>
        </div>
      {/if}
    </section>
  </div>
</div>
