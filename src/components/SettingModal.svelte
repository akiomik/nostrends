<script lang="ts">
  import { closeModal } from 'svelte-modals';
  import Modal from './Modal.svelte';
  import { settings } from '../stores/settings';

  export let isOpen: boolean; // provided by Modals
</script>

<Modal {isOpen}>
  <h2 class="mb-8">Setting</h2>

  <label class="label">
    <input type="checkbox" class="checkbox" bind:checked={$settings.isOpenLinkWithApp} />
    Open link with Nostr client instead of snort.social (default: No)
  </label>

  <div class="mt-8 flex justify-end">
    <button class="btn" on:click={closeModal}>Close</button>
  </div>
</Modal>
