<script>
  import { goto, afterNavigate } from "$app/navigation";
  import { base } from "$app/paths";

  import { Button, buttonVariants } from "$components/ui/button/index";
  import * as Table from "$lib/components/ui/table";

  import {
    ArrowBigLeft,
    ArrowBigUp,
    Delete,
    DeleteIcon,
    Edit2,
    Plus,
    Save,
    Trash,
  } from "lucide-svelte";

  import { trainings, settings } from "$stores/stores";

  import Header from "$components/custom/Header.svelte";
  import SettingsDialog from "$components/custom/SettingsDialog.svelte";

  afterNavigate(({ from }) => {
    previousPage = from?.url.pathname.includes("trainings")
      ? base + "/"
      : from?.url.pathname || previousPage;
  });

  const loadTraining = async (id) => {
    await trainings.init();
    training = $trainings.find((t) => t.id == id);
  };
  
  $: if (data.id) loadTraining(data.id);

  export let data;

  let training = undefined;

  let edit = false;
  let previousPage = base;
  let mainSection;

  import * as Card from "$lib/components/ui/card";
  import * as Select from "$lib/components/ui/select";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import TimerDetail from "$components/custom/timer/ui/TimerDetail.svelte";
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
      <TimerDetail bind:training />
    </section>
  </div>
</div>
