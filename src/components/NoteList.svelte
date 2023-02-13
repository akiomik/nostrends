<script lang="ts">
  import type { Note } from '../lib/Note';
  import { SortOrdering } from '../lib/SortOrdering';
  import NoteSorter from '../lib/NoteSorter';
  import NoteListItem from '../components/NoteListItem.svelte';
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { faArrowDownShortWide } from '@fortawesome/free-solid-svg-icons';

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
      <a
        href="https://snort.social/e/{note.nip19Id()}"
        target="_blank"
        rel="noreferrer"
        class="unstyled"
      >
        <NoteListItem {note} />
      </a>
    {:else}
      <NoteListItem {note} />
    {/if}
  </div>
{/each}
