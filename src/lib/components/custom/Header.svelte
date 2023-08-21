<script>
  import { trainings, settings } from "$stores/stores";

  import ThemeSelectDialog from "$components/custom/theme/ThemeSelectDialog.svelte";
  import TrainingSelect from "$components/custom/TrainingSelect.svelte";
  import SettingsDialog from "./SettingsDialog.svelte";

  export let selectedTraining = undefined;
</script>

<header class="flex w-full h-[10vh] top-0">
  <start class="flex h-full items-center pl-2">
    <div class="grid grid-flow-col gap-2" />
  </start>
  <middle class="flex flex-1 h-full items-center pr-2 pl-2">
    {#await trainings.init() then}
      <TrainingSelect bind:selectedTraining />
    {:catch error}
      <p>{error} ...</p>
    {/await}
  </middle>
  <end class="flex-none flex h-full items-center pr-2">
    <div class="grid grid-flow-col gap-2">
      {#await settings.init() then}
        <!-- <ThemeSelectDialog bind:currentTheme={$settings.theme.value} /> -->
        <SettingsDialog />
      {/await}
    </div>
  </end>
</header>
