<script>
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "$components/ui/card";
  import { fade, scale, slide } from "svelte/transition";

  import {
    ArrowBigDown,
    Check,
    Edit,
    Edit2,
    Loader2,
    Pause,
  } from "lucide-svelte";
  import { Button } from "$components/ui/button";

  export let item;
  export let running;
  export let activeStep;
  export let pauseIsRunning;

  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "$components/ui/table";
  import { Input } from "$components/ui/input";
</script>

<Card class="w-full h-auto bg-primary shadow-lg text-primary-foreground">
  <CardHeader>
    <CardTitle>
      <Input placeholder="email" bind:value={item.name} />

      {item.name}</CardTitle>
    <CardDescription />
  </CardHeader>
  <CardContent>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[100px]">Status</TableHead>
          <TableHead>Step</TableHead>
          <TableHead class="text-right">Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {#each item.steps as step, i (i)}
          <TableRow key={i}>
            <TableCell>
              {#if i < activeStep}
                <Check class="h-4 w-4" />
                <!-- {:else if !pauseIsRunning && (i === activeStep && running)} -->
              {:else if i === activeStep && running}
                <Loader2 class="h-4 w-4 animate-spin" />
              {/if}
            </TableCell>
            <TableCell>
              {step.name}
            </TableCell>
            <TableCell class="text-right">{step.duration}</TableCell>
          </TableRow>
        {/each}
      </TableBody>
    </Table>
    <!-- <ul>
      {#each item.steps as step, i}
        <li class="flex items-center mb-4" transition:slide>
          {#if i < activeStep}
            <Check class="h-4 w-4" />
          {:else if pauseIsRunning || (i === activeStep && running)}
            <Loader2 class="h-4 w-4 animate-spin" />
          {/if}
          <p class="flex ml-6 text-sm font-medium leading-none" transition:fade>
            {step.name}
          </p>
        </li>
        {#if i != item.steps.length - 1}
          <li class="flex items-center mb-4" transition:slide>
            {#if i < activeStep}
              <Check class="h-4 w-4" />
            {:else if pauseIsRunning || (i === activeStep && running)}
              <Loader2 class="h-4 w-4 animate-spin" />
            {/if}
            <p
              class="flex ml-6 text-sm font-medium leading-none"
              transition:fade
            >
              Pause
            </p>
          </li>
        {/if}
      {/each}
    </ul> -->
  </CardContent>
  <CardFooter>
    <Button
      class="rounded-full"
      variant="secondary"
      disabled={running}
      on:click={() => {
        document.getElementById("detail").scrollIntoView(true);
      }}
    >
      Edit
      <Edit2 />
    </Button>
  </CardFooter>
</Card>
