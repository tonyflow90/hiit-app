<script>
  import { Card } from "$components/ui/card";
  import { fade, scale, slide } from "svelte/transition";

  import {
    ArrowBigDown,
    Check,
    Edit,
    Edit2,
    Loader2,
    Pause,
  } from "lucide-svelte";
  import { Button, buttonVariants } from "$components/ui/button";

  export let item;
  export let running;
  export let activeStep;
  export let pauseIsRunning;

  import { Table } from "$components/ui/table";
  import { Input } from "$components/ui/input";
  import { base } from "$app/paths";
</script>

<Card.Root class="w-full h-auto bg-primary shadow-lg text-primary-foreground">
  <Card.Header>
    <Card.Title>
      <div class="flex">
        <h1 class="flex flex-auto text-3xl">
          {item.name}
        </h1>
      </div>
    </Card.Title>
  </Card.Header>
  <Card.Content>
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.Head class="w-[100px]">Status</TableHead>
          <Table.Head>Step</TableHead>
          <Table.Head class="text-right">Time</TableHead>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each item.steps as step, i (i)}
          <Table.Row key={i}>
            <Table.Cell>
              {#if i < activeStep}
                <Check class="h-4 w-4" />
                <!-- {:else if !pauseIsRunning && (i === activeStep && running)} -->
              {:else if i === activeStep && running}
                <Loader2 class="h-4 w-4 animate-spin" />
              {/if}
            </Table.Cell>
            <Table.Cell>
              {step.name}
            </Table.Cell>
            <Table.Cell class="text-right">{step.duration}</Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  </Card.Content>
</Card.Root>
