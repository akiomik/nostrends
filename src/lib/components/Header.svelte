<script lang="ts">
  import { AppBar } from '@skeletonlabs/skeleton';
  import { openModal } from 'svelte-modals';
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { faGear } from '@fortawesome/free-solid-svg-icons';
  import SettingsModal from '$lib/components/SettingsModal.svelte';

  const showSettingsModal = () => openModal(SettingsModal);
</script>

<AppBar>
  <svelte:fragment slot="lead">
    <a href="/">
      <span class="flex items-center">
        <img src="/favicon.svg" alt="logo" class="h-8 mr-1" />
        Nostrends
      </span>
    </a>
  </svelte:fragment>

  <svelte:fragment slot="trail">
    <button class="btn-icon" on:click={showSettingsModal}>
      <FontAwesomeIcon icon={faGear} title="Open settings" />
    </button>
  </svelte:fragment>
</AppBar>
