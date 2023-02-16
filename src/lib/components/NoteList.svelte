<script lang="ts">
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { faArrowDownShortWide } from '@fortawesome/free-solid-svg-icons';
  import type Note from '$lib/entities/Note';
  import SortOrdering from '$lib/entities/SortOrdering';
  import NoteSorter from '$lib/services/NoteSorter';
  import NoteListItem from '$lib/components/NoteListItem.svelte';
  import NoteLink from '$lib/components/NoteLink.svelte';

  export let notes: Note[] = [];

  let order = SortOrdering.MostPopular;
  $: sortedNotes = new NoteSorter(notes).sort(order);
</script>

<div class="flex items-center">
  <FontAwesomeIcon icon={faArrowDownShortWide} class="mr-4" />
  <select class="select" bind:value={order}>
    <option value="most-popular">Most popular</option>
    <option value="recently-posted">Recently posted</option>
    <option value="least-recently-posted">Least recently posted</option>
  </select>
</div>

{#each sortedNotes as note}
  <div class="my-8">
    {#if note.id}
      <NoteLink {note} className="unstyled">
        <NoteListItem {note} />
      </NoteLink>
    {:else}
      <NoteListItem {note} />
    {/if}
  </div>
{:else}
  <div class="alert variant-ghost-warning my-8">
    <div class="alert-message">
      <p>No data found &#128064;</p>
    </div>
  </div>
{/each}
