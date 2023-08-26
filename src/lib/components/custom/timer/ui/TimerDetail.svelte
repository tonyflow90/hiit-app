<script>
  import { Button } from "$components/ui/button/index";
  import * as Table from "$lib/components/ui/table";

  import { Edit2, Plus, Save, Trash } from "lucide-svelte";

  import { trainings } from "$stores/stores";

  const loadTraining = async (id) => {
    await trainings.init();
    training = $trainings.find((t) => t.id == id);
  };

  const saveTraining = async () => {
    edit = !edit;
    $trainings = [...$trainings, training];
  };

  const addStep = async () => {
    let newStep = { name: `S${training.steps.length + 1}`, duration: 0 };
    training.steps = [...training.steps, newStep];
  };

  const removeStep = async (index) => {
    delete training.steps[index];
    training.steps = training.steps.filter(Boolean);
  };

  const cancelEdit = async () => {
    edit = !edit;
    loadTraining(training.id);
  };

  const deleteTraining = async (id) => {
    let index = $trainings.findIndex((t) => t.id == id);
    delete $trainings[index];
    $trainings = $trainings.filter(Boolean);
    $trainings = [...$trainings];
    goto(`${base}/`);
  };

  export let training = undefined;

  let edit = false;

  import * as Card from "$lib/components/ui/card";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { goto } from "$app/navigation";
  import { base } from "$app/paths";

  import * as AlertDialog from "$lib/components/ui/alert-dialog";
  let open = false;
</script>

<AlertDialog.Root {open}>
  <!-- <AlertDialog.Trigger>Open</AlertDialog.Trigger> -->
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
      <AlertDialog.Description>
        This action cannot be undone. This will permanently delete this training.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel on:click={() => open = false}>Cancel</AlertDialog.Cancel>
      <AlertDialog.Action>
        <Button variant="destructive" on:click={() => deleteTraining(training.id)}>
          <span>Delete</span>
          <Trash class="ml-2" />
        </Button>
      </AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>

{#if training}
  <Card.Root class="w-full relative">
    <Card.Header>
      <Card.Title>
        {#if edit}
          <Input
            class="flex flex-1 mt-8"
            id="name"
            placeholder="Name ..."
            bind:value={training.name}
          />
        {:else}
          <p class="leading-relaxed text-xl text-accent">
            {training.name}
          </p>
        {/if}
      </Card.Title>
    </Card.Header>
    <Card.Content>
      {#if edit}
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
                disabled={!edit}
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
      {:else}
        <Label class="leading-relaxed" for="name">Pause</Label>
        <p class="leading-relaxed">
          {training.pause_duration}
        </p>
        <Table.Root class="mt-2">
          <Table.Header>
            <Table.Row class="flex">
              <Table.Head class="flex-1">Step</Table.Head>
              <Table.Head class="flex-none text-right">Duration</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {#each training.steps as step}
              <Table.Row class="flex">
                <Table.Cell class="flex-1">
                  {step.name}
                </Table.Cell>
                <Table.Cell class="flex-none text-right">
                  {step.duration}
                </Table.Cell>
              </Table.Row>
            {/each}
          </Table.Body>
        </Table.Root>
      {/if}
    </Card.Content>
    <Card.Footer class="flex justify-between">
      {#if !edit}
        <Button variant="outline" on:click={() => (edit = !edit)}>
          <span>Edit</span>
          <Edit2 class="ml-2" />
        </Button>
        <Button variant="destructive" on:click={() => (open = true)}>
          <span>Delete</span>
          <Trash class="ml-2" />
        </Button>
      {:else}
        <Button variant="outline" on:click={cancelEdit}>
          <span>Cancel</span>
        </Button>
      {/if}
      {#if edit}
        <Button variant="outline" on:click={saveTraining}>
          <span>Save</span>
          <Save class="ml-2" />
        </Button>
      {/if}
    </Card.Footer>
  </Card.Root>
{/if}
