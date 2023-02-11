<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import { relayInit } from 'nostr-tools';
  import type { Event } from 'nostr-tools';
  import { ReactionCountJsonLoader } from '../lib/ReactionCountJsonLoader';
  import { RelayHelper } from '../lib/RelayHelper';
  import { Note } from '../lib/Note';
  import NoteListItem from '../components/NoteListItem.svelte';
  import LoadingSpinner from '../components/LoadingSpinner.svelte';

  const relay = relayInit('wss://relay.damus.io');
  let noteEvents: Event[] = [];
  const profileEventByPubkey: { [key: string]: Event } = {};
  const reactionCounts = ReactionCountJsonLoader.loadTopNRank(30);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uniq = (xs: any[]) => Array.from(new Set(xs));

  onMount(async () => {
    if (browser) {
      relay.connect();
      relay.on('connect', () => {
        console.log(`connected to ${relay.url}`);
      });
      relay.on('error', () => {
        console.error(`failed to connect to ${relay.url}`);
      });

      const noteIds = Object.keys(reactionCounts);
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

  $: notes = noteEvents.reduce((acc: Note[], note: Event) => {
    if (note.id != null) {
      acc.push(Note.fromEvent(note, profileEventByPubkey[note.pubkey], reactionCounts[note.id]));
    }

    return acc;
  }, []);
</script>

<svelte:head>
  <title>Nostrends</title>
  <meta name="description" content="What's trending on nostr?" />
  <meta name="keywords" content="nostr,trends,notes,damus,snort" />
</svelte:head>

<h1>Nostrends</h1>

<p>What's trending on <a href="https://nostr.com">nostr</a>?</p>

{#each notes as note}
  <div class="my-8">
    {#if note.id}
      <a
        href="https://snort.social/e/{note.nip19Id()}"
        target="_blank"
        rel="noreferrer"
        class="unstyled"
      >
        <NoteListItem {note} />
      </a>
    {:else}
      <NoteListItem {note} />
    {/if}
  </div>
{:else}
  <LoadingSpinner />
{/each}
