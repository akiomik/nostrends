<script lang="ts">
  import { Avatar } from '@skeletonlabs/skeleton';
  import type { Profile } from '../lib/Profile';

  export let profile: Profile | null;
</script>

<div class="flex items-center">
  <div class="mr-2">
    <Avatar src={profile?.picture} initials="NO" />
  </div>

  <div class="text-ellipsis overflow-hidden">
    <p class="font-bold text-ellipsis overflow-hidden">
      {profile?.displayName || profile?.name || profile?.pubkey || 'nostrich'}
    </p>

    {#if profile?.nip05}
      <p class="text-ellipsis overflow-hidden">{profile.nip05}</p>
    {/if}
  </div>
</div>
