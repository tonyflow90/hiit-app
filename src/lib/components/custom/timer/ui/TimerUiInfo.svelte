<script>
  import * as Card from "$lib/components/ui/card";
  import { buttonVariants } from "$components/ui/button";

  import { fade } from "svelte/transition";

  import { Check, Edit2, Loader2 } from "lucide-svelte";
  import { Button } from "$components/ui/button";
  import { base } from "$app/paths";

  export let item;
  export let running;
  export let activeStep;
  export let pauseIsRunning;
</script>

<Card.Root  class="w-full h-fit shadow-lg">
  <Card.Header>
    <Card.Title>
      <div class="flex">
        <h1 class="flex flex-auto text-3xl text-accent">
          {item.name}
        </h1>
        <a
          href="{base}/trainings/{item.id}"
          class={buttonVariants({ variant: "ghost" })}
        >
          <Edit2 />
        </a>
      </div>
    </Card.Title>
    <Card.Description>
      You have {activeStep != undefined ? activeStep : 0}/{item.steps.length} steps completed.
    </Card.Description>
  </Card.Header>
  <Card.Content>
    <ul class="flex items-center h-10 overflow-hidden relative">
      {#each item.steps as step, i}
        {#if activeStep === i}
          <li
            class="flex items-center border h-10 w-full pl-4 pr-4 rounded-full absolute"
            transition:fade
          >
            {#if i < activeStep}
              <Check class="h-4 w-4" />
            {:else if pauseIsRunning || (i === activeStep && running)}
              <Loader2 class="h-4 w-4 animate-spin" />
            {/if}
            {#if pauseIsRunning}
              <p
                class="flex ml-6 text-sm font-medium leading-none"
                in:fade={{ delay: 300, duration: 250 }}
              >
                Pause
              </p>
            {:else}
              <p
                class="flex ml-6 text-sm font-medium leading-none"
                in:fade={{ delay: 300, duration: 250 }}
              >
                {step.name}
              </p>
            {/if}
          </li>
        {/if}
      {/each}
    </ul>
  </Card.Content>
</Card.Root>