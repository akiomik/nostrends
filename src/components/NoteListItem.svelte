<script lang="ts">
  export let note;
</script>

<div>
  <a href="https://snort.social/e/{note.nip19Id()}">
    <p>{note.profile?.name || 'nostrich'}</p>
    <p>{note.content}</p>
  </a>
</div>
