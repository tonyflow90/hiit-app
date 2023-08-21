<script>
  import { buttonVariants } from "$components/ui/button";
  import * as Dialog from "$components/ui/dialog";

  import { Paintbrush2 } from "lucide-svelte";
  import ThemeSelect from "./ThemeSelect.svelte";

  export let currentTheme = undefined;
</script>

<Dialog.Root>
  <Dialog.Trigger class={buttonVariants({ variant: "outline" })}>
    <Paintbrush2 />
  </Dialog.Trigger>
  <Dialog.Content class="flex flex-col h-[100vh] md:h-auto">
    <Dialog.Header>
      <Dialog.Title>Theme Picker</Dialog.Title>
      <Dialog.Description>Select your theme.</Dialog.Description>
    </Dialog.Header>
    <ThemeSelect bind:currentTheme />
  </Dialog.Content>
</Dialog.Root>