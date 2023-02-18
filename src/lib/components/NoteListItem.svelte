<script lang="ts">
  import type Note from '$lib/entities/Note';
  import { NoteContentFormatter } from '$lib/services/NoteContentFormatter';
  import NoteListItemProfile from '$lib/components/NoteListItemProfile.svelte';
  import ProfileLink from '$lib/components/ProfileLink.svelte';

  export let note: Note;
</script>

<div class="card">
  <div class="p-4">
    {#await note.asyncProfile}
      <NoteListItemProfile profile={undefined} />
    {:then profile}
      {#if profile?.id}
        <ProfileLink {profile} class="unstyled">
          <NoteListItemProfile {profile} />
        </ProfileLink>
      {:else}
        <NoteListItemProfile {profile} />
      {/if}
    {/await}

    <p class="text-ellipsis overflow-hidden line-clamp-8 mt-4">
      {@html NoteContentFormatter.format(note.modifiedContent())}
    </p>
  </div>

  <hr />

  <footer class="card-footer flex justify-between p-4">
    <p>+{note.reactions || 0} reactions &#129305;</p>
    <p>
      {Intl.DateTimeFormat('ja-JP', { dateStyle: 'medium', timeStyle: 'medium' }).format(
        note.createdAt
      )}
    </p>
  </footer>
</div>
