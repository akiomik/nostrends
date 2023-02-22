<script lang="ts">
  import { TabGroup, Tab } from '@skeletonlabs/skeleton';
  import type Note from '$lib/entities/Note';
  import type DataSource from '$lib/entities/DataSource';
  import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
  import NoteList from '$lib/components/NoteList.svelte';
  import ExternalLink from '$lib/components/ExternalLink.svelte';

  export let data: {
    dataSources: DataSource[];
    asyncNotesByDataSource: { [key: string]: Promise<Promise<Note | undefined>[]> | undefined };
  };

  let dataSourceTab = 0;

  $: selectedDataSource = data.dataSources[dataSourceTab];
  $: selectedAsyncNotes = data.asyncNotesByDataSource[selectedDataSource.normalizedFullName()];
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

<div class="alert variant-ghost-warning my-8">
  <div class="alert-message">
    <p>
      We are currently having issues with Chrome and Edge not being able to browse tabs, please
      consider using Safari or Firefox &#128546;
    </p>
  </div>
</div>

<TabGroup regionList="overflow-x-auto">
  {#each data.dataSources as dataSource, i}
    <Tab bind:group={dataSourceTab} name={dataSource.normalizedFullName()} value={i}>
      {dataSource.displayName()}
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
