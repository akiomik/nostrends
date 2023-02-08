<script>
  import { AppShell } from '@skeletonlabs/skeleton';
  import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
  import '@skeletonlabs/skeleton/styles/all.css';
  import '../app.postcss';
</script>

<AppShell>
  <div class="container mx-auto p-8 space-y-8">
    <slot />
  </div>

  <svelte:fragment slot="footer">
    <hr />

    <div class="p-8 flex justify-center">
      <p>&copy; 2023 Nostrends</p>
    </div>
  </svelte:fragment>
</AppShell>
