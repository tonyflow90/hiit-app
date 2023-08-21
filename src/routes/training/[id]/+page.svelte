<script>
  import { onMount } from "svelte";

  onMount(async () => {
    await trainings.init();
  });

  /**
   * @type {number | undefined}
   */
  let training = undefined;

  /** @type {import('./$types').Snapshot<number>} */
  export const snapshot = {
    capture: () => training,
    restore: (value) => (training = value),
  };

  export let data;

  import { trainings } from "$stores/stores";

  $: if (data.id) {
    // if ($trainings && $trainings != {})
    //   training = $trainings.find((t) => {
    //     return t.id == data.id;
    //   });
  }
</script>

<div class="flex flex-col w-full min-h-[90vh] items-center">
  <div class="flex flex-col flex-1 w-full max-w-2xl">
    {data.id}
    {#if training}
      {training}
    {/if}
  </div>
</div>
