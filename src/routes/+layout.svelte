<script>
  import { AppShell } from '@skeletonlabs/skeleton';
  import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
  import '@skeletonlabs/skeleton/styles/all.css';
  import '@fortawesome/fontawesome-svg-core/styles.css';
  import '../app.postcss';
  import Header from '../components/Header.svelte';
</script>

<svelte:head>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-KQC5SVSF6M"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());

    gtag('config', 'G-KQC5SVSF6M');
  </script>

  <meta property="og:locale" content="en_US" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Nostrends" />
</svelte:head>

<AppShell>
  <svelte:fragment slot="header">
    <Header />
  </svelte:fragment>

  <div class="container mx-auto max-w-lg p-4 space-y-8 mt-4">
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
