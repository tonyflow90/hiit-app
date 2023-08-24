<script>
  import { onMount } from "svelte";
  import { goto, afterNavigate } from "$app/navigation";
  import { base } from "$app/paths";
  import { fade } from "svelte/transition";

  import { Button, buttonVariants } from "$components/ui/button/index";

  import { ArrowBigLeft, ArrowBigUp, Edit2 } from "lucide-svelte";

  import { trainings, settings } from "$stores/stores";

  import Header from "$components/custom/Header.svelte";
  import SettingsDialog from "$components/custom/SettingsDialog.svelte";

  onMount(() => {
    window.addEventListener("scroll", (evt) => {
      if (evt.currentTarget.pageYOffset >= 150) showScrollToTopButton = true;
    });
  });

  afterNavigate(({ from }) => {
    previousPage = from?.url.pathname.includes('trainings') ? base + "/" : from?.url.pathname || previousPage;
  });

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  let previousPage = base;
  let showScrollToTopButton = false;
  let mainSection;
</script>

<svelte:head>
  <title>Training - HIIT App</title>
  <meta name="description" content="Training - HIIT App" />
</svelte:head>

<div class="flex flex-col w-full min-h-[100vh] items-center">
  <div class="flex flex-col flex-1 w-full max-w-2xl">
    <Header>
      <div>
        <Button
          class="hover:bg-accent"
          variant="ghost"
          on:click={() => goto(previousPage)}
        >
          <ArrowBigLeft />
        </Button>
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
      {#await trainings.init() then}
        <ul>
          {#each $trainings as item, i}
            <li
              class="items-center border-2 rounded-sm justify-center m-2 p-2"
              in:fade={{ delay: 350, duration: 250 }}
              out:fade={{ delay: 0, duration: 250 }}
            >
              <div class="flex">
                <h1 class="flex flex-auto text-lg">
                  {item.name}
                </h1>
                <a
                  href="{base}/trainings/{item.id}"
                  class={buttonVariants({ variant: "ghost" })}
                >
                  <Edit2 />
                </a>
              </div>
              <span class="flex text-sm">
                You have {item.steps.length} steps to complete.
              </span>
            </li>
          {/each}
        </ul>
      {:catch error}
        <p>{error} ...</p>
      {/await}
    </section>
  </div>
</div>