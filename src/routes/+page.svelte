<script>
  import { ArrowBigDown, ArrowBigUp } from "lucide-svelte";

  import { Button } from "$components/ui/button/index";
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

  import TimerDetail from "$components/custom/timer/TimerDetail.svelte";
  import TimerInfo from "$components/custom/timer/TimerInfo.svelte";
  import Timer from "$components/custom/timer/TimerUi.svelte";
  import { fade, scale } from "svelte/transition";
  import { onMount } from "svelte";

  let activeStep = 0;

  let mainSection;
  let detailSection;
  let showScrollToTopButton = false;
  let showScrollToDetailButton = true;

  import Header from "$components/custom/Header.svelte";
  import ThemeSelect from "$components/custom/theme/ThemeSelect.svelte";

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
</script>

<svelte:head>
  <title>HIIT App</title>
  <meta name="description" content="HIIT App" />
</svelte:head>

<Notification bind:this={notification} />

{#if showScrollToTopButton}
  <div class="flex fixed z-50 bottom-8 right-8" transition:fade>
    <div class="flex flex-col items-center justify-center">
      <Button
        class="rounded-full hover:bg-accent w-16 h-16 p-0"
        variant="secondary"
        on:click={scrollToTop}
      >
        <ArrowBigUp />
      </Button>
    </div>
  </div>
{:else if selectedTraining}
  <div class="flex fixed z-50 bottom-8 right-8" transition:fade>
    <div class="flex flex-col items-center justify-center">
      <Button
        class="rounded-full hover:bg-accent w-16 h-16 p-0"
        variant="secondary"
        on:click={() => scrollToElement(detailSection)}
      >
        <ArrowBigDown />
      </Button>
    </div>
  </div>
{/if}

<div class="flex flex-col w-full min-h-[100vh] items-center">
  <div class="flex flex-col flex-1 w-full max-w-2xl">
    <Header bind:selectedTraining />

    {#if selectedTraining}
      <section
        bind:this={mainSection}
        id="main"
        class="flex flex-col w-full h-[90vh]"
      >
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
        <div class="items-center justify-center p-8 pl-2 pr-2 overflow-hidden">
          <div
            in:fade={{ delay: 350, duration: 250 }}
            out:fade={{ delay: 0, duration: 250 }}
          >
            <TimerInfo
              item={selectedTraining}
              {running}
              {activeStep}
              {pauseIsRunning}
            />
          </div>
        </div>
      </section>

      <section
        bind:this={detailSection}
        id="detail"
        class="w-full min-h-[100vh] pt-6 pl-2 pr-2 overflow-visible"
      >
        <div class="w-full items-center justify-center">
          <TimerDetail
            bind:item={selectedTraining}
            {running}
            {activeStep}
            {pauseIsRunning}
          />
        </div>
      </section>
    {/if}
  </div>
</div>

<!-- {#await trainings.init() then}
  <div class="flex flex-col w-full min-h-[90vh] items-center">
    <div class="flex flex-col flex-1 w-full max-w-2xl">
      {#if selectedItem}
        <section bind:this={mainSection} id="main" class="w-full h-[90vh]">
          <div class="flex w-full items-center justify-center overflow-hidden">
            {#each $trainings as item, i}
              {#if item === selectedItem}
                <div
                  in:scale={{ delay: 300, duration: 250 }}
                  out:fade={{ delay: 0, duration: 250 }}
                >
                  <Timer
                    {item}
                    bind:running
                    bind:activeStep
                    bind:pauseIsRunning
                  />
                </div>
              {/if}
            {/each}
          </div>
          <div class="items-center justify-center pl-2 pr-2 overflow-hidden">
            {#each $trainings as item, i}
              {#if item === selectedItem}
                <div
                  in:fade={{ delay: 350, duration: 250 }}
                  out:fade={{ delay: 0, duration: 250 }}
                >
                  <TimerInfo {item} {running} {activeStep} {pauseIsRunning} />
                </div>
              {/if}
            {/each}
          </div>
        </section>

        <section
          bind:this={detailSection}
          id="detail"
          class="w-full min-h-[100vh] pt-6 pl-2 pr-2 overflow-visible"
        >
          <div class="w-full items-center justify-center">
            {#each $trainings as item, i}
              {#if item === selectedItem}
                <TimerDetail
                  bind:item
                  {running}
                  {activeStep}
                  {pauseIsRunning}
                />
              {/if}
            {/each}
          </div>
        </section>
      {/if}
    </div>
  </div>
{:catch error}
  <p>{error} ...</p>
{/await} -->
