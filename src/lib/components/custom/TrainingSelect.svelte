<script>
  import * as Select from "$components/ui/select";

  import { trainings } from "$stores/stores";

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
    <Select.Trigger class="min-w-[200px]">
      <Select.Value placeholder="Select a training" />
    </Select.Trigger>
    <Select.Content>
      <Select.Group>
        <Select.Label>Trainings</Select.Label>
        {#each $trainings as training, i}
          <Select.Item
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
