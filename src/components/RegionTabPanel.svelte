<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import type { Event } from 'nostr-tools';
  import AsyncRelay from '../lib/AsyncRelay';
  import { ReactionCountJsonLoader } from '../lib/ReactionCountJsonLoader';
  import type Region from '../entities/Region';
  import Note from '../entities/Note';
  import NoteList from './NoteList.svelte';
  import LoadingSpinner from './LoadingSpinner.svelte';

  export let region: Region;

  const relay = new AsyncRelay(region.relays[0]);
  let noteEvents: Event[] = [];
  const profileEventByPubkey: { [key: string]: Event } = {};
  const reactionCounts = ReactionCountJsonLoader.loadTopNRank(region, 50);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uniq = (xs: any[]) => Array.from(new Set(xs));

  onMount(async () => {
    if (browser) {
      await relay.connect();
      const noteIds = Object.keys(reactionCounts);
      noteEvents = await relay.sub([{ ids: noteIds }]);
      const pubkeys = uniq(noteEvents.map((note) => note.pubkey));
      const profileEvents = await relay.sub([{ authors: pubkeys, kinds: [0] }]);
      profileEvents.forEach((profile) => (profileEventByPubkey[profile.pubkey] = profile));
    }
  });

  onDestroy(async () => {
    if (browser) {
      await relay.close();
    }
  });

  $: notes = noteEvents.reduce((acc: Note[], note: Event) => {
    if (note.id !== undefined) {
      acc.push(Note.fromEvent(note, profileEventByPubkey[note.pubkey], reactionCounts[note.id]));
    }

    return acc;
  }, []);
</script>

{#if notes.length === 0}
  <LoadingSpinner />
{:else}
  <NoteList {notes} />
{/if}
