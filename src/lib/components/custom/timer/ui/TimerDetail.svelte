<script>
  import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
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
  import { Button, buttonVariants } from "$components/ui/button";

  export let item;
  export let running;
  export let activeStep;
  export let pauseIsRunning;

  import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
  } from "$components/ui/table";
  import { Input } from "$components/ui/input";
  import { base } from "$app/paths";
</script>

<Card class="w-full h-auto bg-primary shadow-lg text-primary-foreground">
  <CardHeader>
    <CardTitle>
      <div class="flex">
        <h1 class="flex flex-auto text-3xl">
          {item.name}
        </h1>
      </div>
    </CardTitle>
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
  </CardContent>
</Card>
