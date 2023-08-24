<header class="flex w-full h-[10vh] top-0">
  <start class="flex h-full items-center pl-2">
    <slot name="start" />
  </start>
  <middle class="flex flex-1 h-full items-center pr-2 pl-2">
    <slot />
  </middle>
  <end class="flex-none flex h-full items-center pr-2">
    <slot name="end" />
  </end>
</header>
