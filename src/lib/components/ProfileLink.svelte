<script lang="ts">
  import { settings } from '$lib/stores/settings';
  import type Profile from '$lib/entities/Profile';
  import ExternalLink from '$lib/components/ExternalLink.svelte';

  export let profile: Profile;
  let className = '';
  export { className as class };

  $: isOpenLinkWithApp = $settings.isOpenLinkWithApp;
  $: href = isOpenLinkWithApp
    ? `nostr://${profile.nip19Id()}`
    : `https://snort.social/p/${profile.nip19Id()}`;
</script>

<ExternalLink {href} class={className}>
  <slot />
</ExternalLink>
