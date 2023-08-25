<script>
  import { onMount } from "svelte";
  import { afterNavigate } from "$app/navigation";
  import { base } from "$app/paths";
  import { fade } from "svelte/transition";

  import { Button, buttonVariants } from "$components/ui/button/index";

  import { ArrowBigLeft, ArrowBigUp, Edit2 } from "lucide-svelte";

  import { trainings, settings } from "$stores/stores";

  import Header from "$components/custom/Header.svelte";
  import SettingsDialog from "$components/custom/SettingsDialog.svelte";
  import { Card, CardContent } from "$components/ui/card";

  onMount(() => {
    window.addEventListener("scroll", (evt) => {
      if (evt.currentTarget.pageYOffset >= 150) showScrollToTopButton = true;
    });
  });

  afterNavigate(({ from }) => {
    previousPage = from?.url.pathname.includes("trainings")
      ? base + "/"
      : from?.url.pathname || previousPage;
  });

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  let previousPage = base;
  let showScrollToTopButton = false;
  let mainSection;
</script>

<svelte:head>
  <title>Trainings - HIIT App</title>
  <meta name="description" content="Trainings - HIIT App" />
</svelte:head>

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
{/if}

<div class="flex flex-col w-full min-h-[100vh] items-center">
  <div class="flex flex-col flex-1 w-full max-w-2xl">
    <Header>
      <div>
        <a
          href={previousPage}
          class="{buttonVariants({ variant: 'ghost' })} hover:bg-accent"
        >
          <ArrowBigLeft class="flex m-2" />
        </a>
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
              class="m-2"
              in:fade={{ delay: 350, duration: 250 }}
              out:fade={{ delay: 0, duration: 250 }}
            >
              <Card class="w-full">
                <CardContent class="p-2">
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
                </CardContent>
              </Card>
            </li>
          {/each}
        </ul>
      {:catch error}
        <p>{error} ...</p>
      {/await}
    </section>
  </div>
</div>
