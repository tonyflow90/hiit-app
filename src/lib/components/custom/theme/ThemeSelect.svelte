<script>
  import * as Select from "$components/ui/select";
  import { themes } from "./themes.js";

  export let currentTheme = "default";
</script>

<Select.Root bind:value={currentTheme}>
  <Select.Trigger class="min-w-[200px] max-w-md">
    <Select.Value placeholder="Select a theme" />
  </Select.Trigger>
  <Select.Content>
    <Select.Group>
      <Select.Label>Themes</Select.Label>
      {#each themes as theme}
        <Select.Item
          on:click={() => {
            return (currentTheme = theme);
          }}
          value={theme}
          label={theme}
          >{theme.charAt(0).toUpperCase()}{theme.slice(1)}</Select.Item
        >
      {/each}
    </Select.Group>
  </Select.Content>
</Select.Root>
