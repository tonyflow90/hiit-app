<script>
  import { afterNavigate } from "$app/navigation";
  import { base } from "$app/paths";

  import { buttonVariants } from "$components/ui/button/index";

  import { ArrowBigLeft } from "lucide-svelte";

  import { settings } from "$stores/stores";

  import TimerCreate from "$components/custom/timer/ui/TimerCreate.svelte";

  import Header from "$components/custom/Header.svelte";
  import SettingsDialog from "$components/custom/SettingsDialog.svelte";

  afterNavigate(({ from }) => {
    previousPage = from?.url.pathname.includes("trainings")
      ? base + "/"
      : from?.url.pathname || previousPage;
  });

  let previousPage = base;
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
      class="flex flex-col w-full h-[90vh] pl-2 pr-2"
    >
      <TimerCreate />
    </section>
  </div>
</div>
