<script>
  import { buttonVariants } from "$components/ui/button";
  import * as Dialog from "$components/ui/dialog";
  import { Input } from "$components/ui/input";
  import { Label } from "$components/ui/label";

  import { Settings } from "lucide-svelte";

  import { settings } from "$stores/stores";
  import ThemeSelect from "./theme/ThemeSelect.svelte";
</script>

<Dialog.Root>
  <Dialog.Trigger class={buttonVariants({ variant: "outline" })}>
    <Settings />
  </Dialog.Trigger>
  <Dialog.Content class="flex flex-col h-[100vh] md:h-auto">
    <Dialog.Header>
      <Dialog.Title>Settings</Dialog.Title>
      <Dialog.Description>Edit your settings.</Dialog.Description>
    </Dialog.Header>
    {#await settings.init() then}
      <div class="flex flex-col space-y-2">
        <Label class="text-left">Theme</Label>
        <ThemeSelect bind:currentTheme={$settings.theme.value} />
        <!-- <Label class="text-left">Username</Label>
        <Input id="username" value="@peduarte" class="col-span-3" /> -->
      </div>
    {/await}
  </Dialog.Content>
</Dialog.Root>
