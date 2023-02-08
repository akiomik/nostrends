<script lang="ts">
  import NoteListItemProfile from './NoteListItemProfile.svelte';
  import type { Note } from '../lib/Note';
  import { NoteContentFormatter } from '../lib/NoteContentFormatter';

  export let note: Note;
</script>

<div class="card">
  <div class="p-4">
    {#if note.profile?.id}
      <a href="https://snort.social/p/{note.profile.nip19Id()}" class="unstyled">
        <NoteListItemProfile profile={note.profile} />
      </a>
    {:else}
      <NoteListItemProfile profile={note.profile} />
    {/if}

    <p class="text-ellipsis overflow-hidden mt-4">
      {@html NoteContentFormatter.format(note.content)}
    </p>
  </div>

  <!-- <hr /> -->
  <!-- TODO: show reactions -->
  <!-- <footer class="card-footer p-4">(footer)</footer> -->
</div>
