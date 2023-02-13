import { persisted } from 'svelte-local-storage-store';

export const settings = persisted('settings', {
  isOpenLinkWithApp: false
});
