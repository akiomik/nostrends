<script lang="ts">
  export let isOpen: boolean;
</script>

{#if isOpen}
  <div
    role="dialog"
    class="fixed inset-0 flex justify-center items-center pointer-events-none z-20"
  >
    <div class="w-96 p-8 bg-surface-50 dark:bg-surface-900 rounded pointer-events-auto">
      <slot />
    </div>
  </div>
{/if}
