<script>
  import { base } from "$app/paths";
  import { buttonVariants } from "$components/ui/button";
  import * as Select from "$components/ui/select";

  import { trainings } from "$stores/stores";
  import { ArrowBigRight, Plus } from "lucide-svelte";

  export let selectedTraining = undefined;
  let selectedTrainingId = undefined;
  $: if (selectedTrainingId) {
    selectedTraining = $trainings.find((t) => {
      return t.id == selectedTrainingId;
    });
  }
</script>

{#await trainings.init() then}
  <Select.Root bind:value={selectedTrainingId}>
    <Select.Trigger class="min-w-[280px]">
      <Select.Value placeholder="Select a training" />
    </Select.Trigger>
    <Select.Content class="w-[500px]">
      <Select.Group>
        <Select.Label class="text-lg text-accent">Trainings</Select.Label>
        <div
          class="grid grid-flow-col grid-cols-2 gap-1 items-center justify-center pb-1"
        >
          <a
            href="{base}/trainings/create"
            class="{buttonVariants({ variant: 'outline' })}"
          >
            <Plus class="flex mr-1" />
            <span class="flex flex-auto items-center justify-center text-sm"
              >new</span
            >
          </a>
          <a
            href="{base}/trainings"
            class="{buttonVariants({ variant: 'outline' })}"
          >
            <span class="flex flex-auto items-center justify-center text-sm"
              >all</span
            >
            <ArrowBigRight class="flex ml-2" />
          </a>
        </div>
        {#each $trainings as training, i}
          <Select.Item
            class="border-2 rounded-sm mt-2"
            on:click={() => {
              selectedTraining = training;
            }}
            value={training.id}
            label={training.name}>{training.name}</Select.Item
          >
        {/each}
      </Select.Group>
    </Select.Content>
  </Select.Root>
{:catch error}
  <p>{error} ...</p>
{/await}
