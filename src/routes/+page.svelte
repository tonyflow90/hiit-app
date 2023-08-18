<script>
  import {
    ArrowBigDown,
    ArrowBigUp,
    ChevronDown,
    ChevronUp,
    Dot,
    Loader2,
    Plus,
    Settings,
  } from "lucide-svelte";

  import { Button } from "$components/ui/button/index";

  import Notification from "$components/custom/notification/Notification.svelte";

  import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "$components/ui/collapsible/index";

  import { trainings, settings } from "$stores/stores";

  //   onMount(() => {
  //     settings.init()
  //     .then(() => {
  //       if('water' in $settings) {
  //         reactiveString = `water set to
  // ${settings.water.value
  // }`;
  //       }
  //     });

  export let data;

  // $: promiseItems = data.promise.items;

  /**
   * @type {number | undefined}
   */
  let selectedItem = undefined;

  /** @type {import('./$types').Snapshot<number>} */
  export const snapshot = {
    capture: () => selectedItem,
    restore: (value) => (selectedItem = value),
  };

  /**
   * @type {Notification}
   */
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

  import TimerDetail from "$lib/TimerDetail.svelte";
  import TimerInfo from "$lib/TimerInfo.svelte";
  import { fade, scale } from "svelte/transition";
  import Timer from "$lib/Timer.svelte";
  import { onMount } from "svelte";

  let activeStep = 0;

  let mainSection;
  let detailSection;
  let showScrollToTopButton = false;
  let showScrollToDetailButton = true;

  import ThemeSwitch from "$components/custom/theme/ThemeSwitch.svelte";
</script>

<svelte:head>
  <title>HIIT App</title>
  <meta name="description" content="HIIT App" />
</svelte:head>

<Notification bind:this={notification} />

<!-- <Background {show}>
  <Loader2 class="animate-spin text-accent"/>
</Background> -->

{#if showScrollToTopButton}
  <div class="flex fixed bottom-8 right-8" transition:fade>
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
{:else if selectedItem}
  <div class="flex fixed bottom-8 right-8" transition:fade>
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

{#await trainings.init() then}
  <header class="w-full h-[10vh] flex top-0 bg-primary-foreground">
    <start class="flex-none flex h-full items-center pl-2">
      <div class="grid grid-flow-col gap-2" />
    </start>
    <middle class="flex flex-auto h-full items-center pr-2 pl-2">
      <Collapsible bind:open={isOpen} class="w-full">
        <CollapsibleTrigger>
          <div class="flex items-center justify-between w-full relative">
            {#if $trainings.length === 0}
              <Button variant="outline" size="lg">
                Create new training <Plus />
              </Button>
            {:else if !selectedItem}
              <Button variant="outline" size="lg" class="px-4">
                ? of {$trainings.length} trainings
                {#if isOpen}
                  <ChevronUp class="ml-2" />
                {:else}
                  <ChevronDown class="ml-2" />
                {/if}
              </Button>
            {:else}
              <Button variant="outline" size="lg" class="px-4">
                {selectedItem.name}
                {#if isOpen}
                  <ChevronUp class="ml-4" />
                {:else}
                  <ChevronDown class="ml-4" />
                {/if}
              </Button>
            {/if}
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ul
            class="w-10/12 max-w-lg rounded-md z-50 bg-primary shadow-2xl mt-2 p-4 absolute"
          >
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <li
              on:click={() => createTraining()}
              class="flex flex-row rounded-md border mb-2 p-3 font-mono text-sm bg-primary hover:bg-accent hover:text-accent-foreground"
            >
              <Plus class="mr-4" /> Create new training
            </li>
            {#each $trainings as item, i}
              {#if item != selectedItem}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                <li
                  on:click={() => switchTraining(item)}
                  class="rounded-md border mb-2 p-3 font-mono text-sm bg-primary hover:bg-accent hover:text-accent-foreground"
                >
                  {item.name}
                </li>
              {/if}
            {/each}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    </middle>
    <end class="flex-none flex h-full items-center pr-2">
      <div class="grid grid-flow-col gap-2">
        {#await settings.init() then}
          <ThemeSwitch bind:currentTheme={$settings.theme.value} />
        {/await}

        <!-- <DarkmodeButton /> -->
      </div>
    </end>
  </header>

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
{/await}
