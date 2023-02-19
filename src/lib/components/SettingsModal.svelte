<script lang="ts">
  import { closeModal } from 'svelte-modals';
  import { storeLightSwitch } from '@skeletonlabs/skeleton';
  import { settings } from '$lib/stores/settings';
  import Modal from '$lib/components/Modal.svelte';

  export let isOpen: boolean; // provided by Modals
</script>

<Modal {isOpen}>
  <h2>Settings</h2>

  <label class="label mt-4">
    <input type="checkbox" class="checkbox" bind:checked={$settings.isOpenLinkWithApp} />
    <span>Open link with Nostr client instead of snort.social (default: No)</span>
  </label>

  <label class="label mt-4">
    <span>Dark mode (default: System)</span>
    <select class="select" bind:value={$storeLightSwitch}>
      <option value={null}>Sync with system preference</option>
      <option value={true}>Dark mode</option>
      <option value={false}>Light mode</option>
    </select>
  </label>

  <div class="mt-8 flex justify-end">
    <button class="btn" on:click={closeModal}>Close</button>
  </div>
</Modal>
