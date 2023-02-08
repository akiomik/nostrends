<script lang="ts">
  import NoteListItemProfile from './NoteListItemProfile.svelte';
  import type { Note } from '../lib/Note';
  import { NoteContentFormatter } from '../lib/NoteContentFormatter';

  export let note: Note;
</script>

<div class="card">
  <div class="p-4">
    {#if note.profile?.id}
      <a
        href="https://snort.social/p/{note.profile.nip19Id()}"
        target="_blank"
        rel="noreferrer"
        class="unstyled"
      >
        <NoteListItemProfile profile={note.profile} />
      </a>
    {:else}
      <NoteListItemProfile profile={note.profile} />
    {/if}

    <p class="text-ellipsis overflow-hidden mt-4">
      {@html NoteContentFormatter.format(note.content)}
    </p>
  </div>

  <hr />

  <footer class="card-footer flex justify-between p-4">
    <p>+{note.reactions} reactions</p>
    <p>
      {Intl.DateTimeFormat('ja-JP', { dateStyle: 'medium', timeStyle: 'medium' }).format(
        note.createdAt
      )}
    </p>
  </footer>
</div>
