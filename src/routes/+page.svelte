<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import { relayInit } from 'nostr-tools';
  import { EventCountJsonLoader } from '../lib/EventCountJsonLoader';
  import { RelayHelper } from '../lib/RelayHelper';
  import NoteListItem from '../components/NoteListItem.svelte';

  const relay = relayInit('wss://relay.damus.io');
  let notes = [];
  let usersByPubkey = {};

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
      notes = await RelayHelper.asyncSub(relay, [{ ids: noteIds }]);
      const pubkeys = uniq(notes.map((note) => note.pubkey));
      const users = await RelayHelper.asyncSub(relay, [{ authors: pubkeys, kinds: [0] }]);
      users.forEach((user) => (usersByPubkey[user.pubkey] = user));
    }
  });

  onDestroy(() => {
    if (browser) {
      relay.close();
    }
  });

  $: xs = notes.map((note) => {
    return [note, usersByPubkey[note.pubkey]];
  });
</script>

<h1>Nostrends</h1>

<p>What's trending on nostr world?</p>

{#each xs as x}
  <NoteListItem note={x[0]} user={x[1]} />
{/each}
