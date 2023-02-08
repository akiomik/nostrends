<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import { relayInit } from 'nostr-tools';
  import { EventCountJsonLoader } from '../lib/EventCountJsonLoader';
  import NoteListItem from '../components/NoteListItem.svelte';

  const relay = relayInit('wss://relay.damus.io');
  const notes = {};
  let users = {};

  onMount(() => {
    if (browser) {
      relay.connect();
      relay.on('connect', () => {
        console.log(`connected to ${relay.url}`);
      });
      relay.on('error', () => {
        console.error(`failed to connect to ${relay.url}`);
      });
    }
  });

  onDestroy(() => {
    if (browser) {
      relay.close();
    }
  });

  const eventCounts = EventCountJsonLoader.loadTopNRank(30);
  const noteIds = Object.keys(eventCounts);
  const noteSub = relay.sub([{ ids: noteIds }]);
  noteSub.on('event', (note) => {
    notes[note.id] = note;

    if (users[note.pubkey] == null) {
      const userSub = relay.sub([{ authors: [note.pubkey], kinds: [0] }]);
      userSub.on('event', (user) => (users[user.pubkey] = user));
      userSub.on('eose', () => userSub.unsub());
    }
  });
  noteSub.on('eose', () => noteSub.unsub());

  $: xs = Object.values(notes).map((note) => {
    return [note, users[note.pubkey]];
  });
</script>

<h1>Nostrends</h1>

<p>What's trending on nostr world?</p>

{#each xs as x}
  <NoteListItem note={x[0]} user={x[1]} />
{/each}
