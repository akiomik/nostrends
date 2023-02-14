<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import { TabGroup, Tab } from '@skeletonlabs/skeleton';
  import RegionTabPanel from '../components/RegionTabPanel.svelte';
  import AsyncRelay from '../lib/AsyncRelay';
  import { globalRegion, jpRegion } from '../entities/Regions';

  const regions = [globalRegion, jpRegion];
  let regionTab = 0;
  let relays = regions.map((region) => new AsyncRelay(region.relays));

  $: selectedRegion = regions[regionTab];
  $: selectedRelay = relays[regionTab];

  onMount(async () => {
    if (browser) {
      const promises = relays.map((relay) => relay.connect());
      await Promise.all(promises);
    }
  });

  onDestroy(async () => {
    if (browser) {
      const promises = relays.map((relay) => relay.close());
      await Promise.all(promises);
    }
  });
</script>

<svelte:head>
  <title>Nostrends</title>
  <meta name="description" content="What's trending on Nostr?" />
  <meta name="keywords" content="nostr,trends,notes,damus,snort" />
  <meta property="og:url" content="https://nostrends.vercel.app" />
  <meta property="og:title" content="Nostrends" />
  <meta property="og:description" content="What's trending on Nostr?" />
</svelte:head>

<h1>Nostrends</h1>

<p>What's trending on <a href="https://nostr.com">Nostr</a>?</p>

<TabGroup>
  {#each regions as region, i}
    <Tab bind:group={regionTab} name={region.normalizedName()} value={i}>{region.name}</Tab>
  {/each}

  <svelte:fragment slot="panel">
    <!-- FIXME: watch regionTab changes -->
    {#if regionTab === 0}
      <RegionTabPanel region={selectedRegion} relay={selectedRelay} />
    {:else}
      <RegionTabPanel region={selectedRegion} relay={selectedRelay} />
    {/if}
  </svelte:fragment>
</TabGroup>
