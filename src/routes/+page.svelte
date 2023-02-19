<script lang="ts">
  import { TabGroup, Tab } from '@skeletonlabs/skeleton';
  import type Note from '$lib/entities/Note';
  import type Region from '$lib/entities/Region';
  import { globalRegion, jpRegion } from '$lib/entities/Regions';
  import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
  import NoteList from '$lib/components/NoteList.svelte';
  import ExternalLink from '$lib/components/ExternalLink.svelte';

  export let data: {
    regions: Region[];
    asyncNotesByRegion: { [key: string]: Promise<Promise<Note | undefined>[]> | undefined };
  };

  let regionTab = 0;

  $: selectedRegion = data.regions[regionTab];
  $: selectedAsyncNotes = data.asyncNotesByRegion[selectedRegion.name];
</script>

<svelte:head>
  <title>Nostrends | What's trending on Nostr?</title>
  <meta name="description" content="What's trending on Nostr?" />
  <meta name="keywords" content="nostr,trends,notes,damus,snort" />
  <meta property="og:url" content="https://nostrends.vercel.app" />
  <meta property="og:title" content="Nostrends | What's trending on Nostr?" />
  <meta property="og:description" content="What's trending on Nostr?" />
</svelte:head>

<h1>Nostrends</h1>

<p>What's trending on <ExternalLink href="https://nostr.com">Nostr</ExternalLink>?</p>

<TabGroup>
  {#each data.regions as region, i}
    <Tab bind:group={regionTab} name={region.normalizedName()} value={i}>
      {region.name}
    </Tab>
  {/each}

  <svelte:fragment slot="panel">
    {#await selectedAsyncNotes}
      <LoadingSpinner />
    {:then asyncNotes}
      {#if asyncNotes}
        <NoteList {asyncNotes} />
      {:else}
        <LoadingSpinner />
      {/if}
    {/await}
  </svelte:fragment>
</TabGroup>
