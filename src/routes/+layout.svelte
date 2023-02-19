<script>
  import { onMount } from 'svelte';
  import { AppShell, storeLightSwitch } from '@skeletonlabs/skeleton';
  import { Modals, closeModal } from 'svelte-modals';
  import { browser } from '$app/environment';
  import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
  import '@skeletonlabs/skeleton/styles/all.css';
  import '@fortawesome/fontawesome-svg-core/styles.css';
  import '../app.postcss';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';

  onMount(() => {
    if (browser) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      storeLightSwitch.subscribe(() => {
        const classes = document.documentElement.classList;
        const darkMode = $storeLightSwitch == null ? prefersDark : $storeLightSwitch;
        darkMode ? classes.add('dark') : classes.remove('dark');
      });
    }
  });
</script>

<AppShell>
  <svelte:fragment slot="header">
    <Header />
  </svelte:fragment>

  <div class="container mx-auto max-w-lg p-4 space-y-8 mt-4">
    <slot />
  </div>

  <Modals>
    <div
      slot="backdrop"
      class="fixed inset-0 z-[15] bg-black opacity-60"
      on:click={closeModal}
      on:keypress={closeModal}
    />
  </Modals>

  <svelte:fragment slot="footer">
    <hr />

    <Footer />
  </svelte:fragment>
</AppShell>
