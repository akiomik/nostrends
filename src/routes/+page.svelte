<script lang="ts">
  import { TabGroup, Tab } from '@skeletonlabs/skeleton';
  import type Note from '$lib/entities/Note';
  import type Region from '$lib/entities/Region';
  import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
  import NoteList from '$lib/components/NoteList.svelte';

  export let data: {
    regions: Region[];
    asyncNotesByRegion: { [key: string]: Promise<Promise<Note | undefined>[]> | undefined };
  };

  let regionTab = 0;

  $: selectedRegion = data.regions[regionTab];
  $: selectedAsyncNotes = data.asyncNotesByRegion[selectedRegion.name];
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
