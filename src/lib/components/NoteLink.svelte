<script lang="ts">
  import { settings } from '$lib/stores/settings';
  import type Note from '$lib/entities/Note';
  import ExternalLink from '$lib/components/ExternalLink.svelte';

  export let note: Note;
  let className = '';
  export { className as class };

  $: isOpenLinkWithApp = $settings.isOpenLinkWithApp;
  $: href = isOpenLinkWithApp
    ? `nostr://${note.nip19Id()}`
    : `https://snort.social/e/${note.nip19Id()}`;
</script>

<ExternalLink {href} class={className}>
  <slot />
</ExternalLink>
