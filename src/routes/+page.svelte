<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import { relayInit } from 'nostr-tools';
  import type { Event } from 'nostr-tools';
  import { EventCountJsonLoader } from '../lib/EventCountJsonLoader';
  import { RelayHelper } from '../lib/RelayHelper';
  import { Note } from '../lib/Note';
  import NoteListItem from '../components/NoteListItem.svelte';

  const relay = relayInit('wss://relay.damus.io');
  let noteEvents: Event[] = [];
  const profileEventByPubkey: { [key: string]: Event } = {};

  const uniq = (xs: [unknown]) => Array.from(new Set(xs));

  onMount(async () => {
    if (browser) {
      relay.connect();
      relay.on('connect', () => {
        console.log(`connected to ${relay.url}`);
      });
      relay.on('error', () => {
        console.error(`failed to connect to ${relay.url}`);
      });

      const eventCounts = EventCountJsonLoader.loadTopNRank(30);
      const noteIds = Object.keys(eventCounts);
      noteEvents = await RelayHelper.asyncSub(relay, [{ ids: noteIds }]);
      const pubkeys = uniq(noteEvents.map((note) => note.pubkey));
      const profileEvents = await RelayHelper.asyncSub(relay, [{ authors: pubkeys, kinds: [0] }]);
      profileEvents.forEach((profile) => (profileEventByPubkey[profile.pubkey] = profile));
    }
  });

  onDestroy(() => {
    if (browser) {
      relay.close();
    }
  });

  $: notes = noteEvents.map((note) => Note.fromEvent(note, profileEventByPubkey[note.pubkey]));
</script>

<h1>Nostrends</h1>

<p>What's trending on nostr world?</p>

{#each notes as note}
  <NoteListItem {note} />
{/each}
