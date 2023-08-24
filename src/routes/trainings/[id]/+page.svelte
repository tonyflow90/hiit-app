<script>
  import { goto, afterNavigate } from "$app/navigation";
  import { base } from "$app/paths";

  import { Button, buttonVariants } from "$components/ui/button/index";
  import * as Table from "$lib/components/ui/table";

  import { ArrowBigLeft, ArrowBigUp, Edit2, Save } from "lucide-svelte";

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

  const saveTraining = async () => {
    edit = !edit;
    $trainings = [...$trainings, training];
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
      <!-- {#await trainings.init() then}
        {#await $trainings.find((t) => t.id == data.id) then training} -->
      {#if training}
        <Card.Root class="w-full">
          <Card.Header>
            <Card.Title>
              <Label for="name">Name</Label>
              <Input
                id="name"
                disabled={!edit}
                placeholder="Name ..."
                bind:value={training.name}
              />
            </Card.Title>
          </Card.Header>
          <Card.Content>
            <div class="grid w-full items-center gap-4">
              <div class="flex flex-col space-y-1.5">
                <Label for="name">Pause</Label>
                <Input
                  id="pause"
                  disabled={!edit}
                  placeholder="Duration ..."
                  bind:value={training.pause_duration}
                />
              </div>

              <Table.Root>
                <Table.Header>
                  <Table.Row>
                    <Table.Head>Step</Table.Head>
                    <Table.Head>Duration</Table.Head>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {#each training.steps as step}
                    <Table.Row>
                      <Table.Cell class="p-1">
                        <Input
                          id="name"
                          disabled={!edit}
                          placeholder="Name ..."
                          bind:value={step.name}
                        />
                      </Table.Cell>
                      <Table.Cell class="p-1">
                        <Input
                          id="name"
                          disabled={!edit}
                          placeholder="Duration ..."
                          type="number"
                          bind:value={step.duration}
                        />
                      </Table.Cell>
                    </Table.Row>
                  {/each}
                </Table.Body>
              </Table.Root>
            </div>
          </Card.Content>
          <Card.Footer class="flex justify-between">
            <Button variant="outline" on:click={() => (edit = !edit)}>
              {#if !edit}
                <span>Edit</span>
                <Edit2 class="ml-2" />
              {:else}
                <span>Cancel</span>
              {/if}
            </Button>
            {#if edit}
              <Button
                variant="outline"
                on:click={saveTraining}
              >
                <span>Save</span>
                <Save class="ml-2" />
              </Button>
            {/if}
          </Card.Footer>
        </Card.Root>
      {/if}
      <!-- {:catch error}
          <p>{error} ...</p>
        {/await}
      {:catch error}
        <p>{error} ...</p>
      {/await} -->
    </section>
  </div>
</div>
