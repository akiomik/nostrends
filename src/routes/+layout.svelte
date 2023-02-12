<script>
  import { AppShell } from '@skeletonlabs/skeleton';
  import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
  import '@skeletonlabs/skeleton/styles/all.css';
  import '../app.postcss';
</script>

<AppShell>
  <div class="container mx-auto max-w-lg p-4 space-y-8">
    <slot />
  </div>

  <svelte:fragment slot="footer">
    <hr />

    <div class="p-8 flex justify-center">
      <ul class="list-none">
        <li class="inline">&copy; 2023 Nostrends</li>
        <li class="inline select-none text-surface-300 cursor-default">・</li>
        <li class="inline"><a href="https://github.com/akiomik/nostrends">Github</a></li>
      </ul>
    </div>
  </svelte:fragment>
</AppShell>
