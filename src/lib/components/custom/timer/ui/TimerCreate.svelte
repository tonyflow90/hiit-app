<script>
  import { Button } from "$components/ui/button/index";
  import * as Table from "$lib/components/ui/table";
  import * as Card from "$lib/components/ui/card";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";

  import { Edit2, Plus, Save, Trash } from "lucide-svelte";

  import { trainings } from "$stores/stores";

  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";

  onMount(async () => {
    await trainings.init();
    let id = 1;
    if ($trainings.length > 0)
      id = Math.max(...$trainings.map((t) => t.id)) + 1;
    newTraining.id = id;
  });

  let newTraining = {
    id: undefined,
    name: "New Training",
    pause_duration: 0,
    steps: [
      {
        name: "Step",
        duration: 0,
      },
    ],
  };

  const createTraining = () => {
    return newTraining;
  };

  const loadTraining = async (id) => {
    await trainings.init();
    training = $trainings.find((t) => t.id == id);
  };

  const save = async () => {
    await trainings.init();
    $trainings = [...$trainings, training];
    goto(`${base}/trainings/${training.id}`);
  };

  const addStep = async () => {
    let newStep = { name: `S${training.steps.length + 1}`, duration: 0 };
    training.steps = [...training.steps, newStep];
  };

  const removeStep = async (index) => {
    delete training.steps[index];
    training.steps = training.steps.filter(Boolean);
  };

  const cancel = async () => {
    loadTraining(training.id);
  };

  let training = createTraining();
</script>

{#if training}
  <Card.Root class="w-full relative">
    <Card.Header>
      <Card.Title>
        <Input
          class="flex flex-1 mt-8"
          id="name"
          placeholder="Name ..."
          bind:value={training.name}
        />
      </Card.Title>
    </Card.Header>
    <Card.Content>
      <Label class="leading-relaxed" for="name">Pause</Label>
      <Input
        id="pause"
        placeholder="Pause time ..."
        bind:value={training.pause_duration}
      />

      <Label class="leading-relaxed" for="steps">Steps</Label>
      <ul class="pb-4">
        {#each training.steps as step, i}
          <li class="grid grid-cols-6 gap-2 pt-2 w-full">
            <Input
              class="col-span-3"
              id="name"
              placeholder="Name ..."
              bind:value={step.name}
            />
            <Input
              class="col-span-2"
              id="name"
              placeholder="Duration ..."
              type="number"
              bind:value={step.duration}
            />
            <Button
              class="p-0 m-0"
              variant="ghost"
              on:click={() => removeStep(i)}
            >
              <Trash />
            </Button>
          </li>
        {/each}
      </ul>
      <Button variant="outline" on:click={addStep}>
        <span>Add</span>
        <Plus class="ml-2" />
      </Button>
    </Card.Content>
    <Card.Footer class="flex justify-between">
      <Button variant="outline" on:click={cancel}>
        <span>Cancel</span>
      </Button>
      <Button variant="outline" on:click={save}>
        <span>Save</span>
        <Save class="ml-2" />
      </Button>
    </Card.Footer>
  </Card.Root>
{/if}
