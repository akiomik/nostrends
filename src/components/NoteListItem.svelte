<script lang="ts">
  import { nip19 } from 'nostr-tools';

  export let note;
  export let user;

  const noteId = nip19.noteEncode(note.id);
  $: parsedUser = user == null ? null : JSON.parse(user.content);
</script>

<div>
  <a href="https://snort.social/e/{noteId}">
    <p>{parsedUser?.name || 'nostrich'}</p>
    <p>{note.content}</p>
  </a>
</div>
