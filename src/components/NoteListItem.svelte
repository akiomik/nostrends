<script lang="ts">
  import type { Note } from '../lib/Note';
  import { NoteContentFormatter } from '../lib/NoteContentFormatter';
  import NoteListItemProfile from './NoteListItemProfile.svelte';
  import ProfileLink from './ProfileLink.svelte';

  export let note: Note;
</script>

<div class="card">
  <div class="p-4">
    {#if note.profile?.id}
      <ProfileLink profile={note.profile} className="unstyled">
        <NoteListItemProfile profile={note.profile} />
      </ProfileLink>
    {:else}
      <NoteListItemProfile profile={note.profile} />
    {/if}

    <p class="text-ellipsis overflow-hidden line-clamp-8 mt-4">
      {@html NoteContentFormatter.format(note.modifiedContent())}
    </p>
  </div>

  <hr />

  <footer class="card-footer flex justify-between p-4">
    <p>+{note.reactions} reactions &#129305;</p>
    <p>
      {Intl.DateTimeFormat('ja-JP', { dateStyle: 'medium', timeStyle: 'medium' }).format(
        note.createdAt
      )}
    </p>
  </footer>
</div>
