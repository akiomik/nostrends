<script lang="ts">
  import { onMount } from 'svelte';
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { faArrowDownShortWide } from '@fortawesome/free-solid-svg-icons';
  import type Note from '$lib/entities/Note';
  import SortOrdering from '$lib/entities/SortOrdering';
  import NoteSorter from '$lib/services/NoteSorter';
  import NoteListItem from '$lib/components/NoteListItem.svelte';
  import NoteLink from '$lib/components/NoteLink.svelte';
  import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';

  export let asyncNotes: Promise<Note | undefined>[];

  // Due to make notes reactive, use object instead array
  let notesById: { [key: string]: Note } = {};
  let processedNoteCount = 0;
  let order = SortOrdering.MostPopular;

  $: notes = Object.values(notesById);
  $: sortedNotes = new NoteSorter(notes).sort(order);

  onMount(() => {
    asyncNotes.forEach((asyncNote) => {
      asyncNote.then((note) => {
        processedNoteCount += 1;

        if (note?.id) {
          notesById[note.id] = note;
        }
      });
    });
  });
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
  {#if asyncNotes.length === processedNoteCount}
    <div class="alert variant-ghost-warning my-8">
      <div class="alert-message">
        <p>No data found &#128064;</p>
      </div>
    </div>
  {:else}
    <LoadingSpinner />
  {/if}
{/each}
