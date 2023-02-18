<script lang="ts">
  import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
  import { faCheck } from '@fortawesome/free-solid-svg-icons';
  import type Profile from '$lib/entities/Profile';

  export let profile: Profile;
</script>

{#await profile.isNip05Valid()}
  <p class="text-ellipsis overflow-hidden">
    {profile.formattedNip05()}
  </p>
{:then valid}
  {#if valid}
    <p class="flex items-center gap-x-1">
      <span class="text-ellipsis overflow-hidden shrink">
        {profile.formattedNip05()}
      </span>
      <span class="badge-icon variant-ghost-primary flex-none">
        <FontAwesomeIcon icon={faCheck} title="Valid NIP-05 identifier" />
      </span>
    </p>
  {:else}
    <p class="text-ellipsis overflow-hidden line-through">
      {profile.formattedNip05()}
    </p>
  {/if}
{/await}
