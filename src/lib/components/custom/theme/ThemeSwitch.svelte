<script>
  import { themes } from "./themes.js";

  import { buttonVariants } from "$components/ui/button";
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "$components/ui/dialog";

  import { Paintbrush2 } from "lucide-svelte";
  import { Toggle } from "$components/ui/toggle";

  export let currentTheme = "default";
</script>

<!-- <select bind:value={currentTheme}>
  {#each themes as theme}
    <option value={theme}
      >{theme.charAt(0).toUpperCase()}{theme.slice(1)}</option
    >
  {/each}
</select> -->

<Dialog modal={true}>
  <DialogTrigger class={buttonVariants({ variant: "ghost" })}>
    <Paintbrush2 />
  </DialogTrigger>
  <DialogContent
    class="flex flex-col sm:h-[100vh] max-h-[100vh] sm:w-full h-auto overflow-auto "
  >
    <DialogHeader>
      <DialogTitle>Theme Picker</DialogTitle>
      <DialogDescription>Select your theme.</DialogDescription>
    </DialogHeader>
    {#each themes as theme}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div
        class="flex w-full"
        on:click={() => {
          return (currentTheme = theme);
        }}
      >
        <Toggle
          class="flex w-full"
          variant="outline"
          pressed={theme === currentTheme}
        >
          {theme.charAt(0).toUpperCase()}{theme.slice(1)}
        </Toggle>
      </div>
    {/each}
  </DialogContent>
</Dialog>
