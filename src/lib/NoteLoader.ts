import type { Event } from 'nostr-tools';
import Note from '../entities/Note';
import type Region from '../entities/Region';
import AsyncRelay from './AsyncRelay';
import { ReactionCountJsonLoader } from './ReactionCountJsonLoader';

export default class NoteLoader {
  private constructor() {
    // noop
  }

  public static async load(region: Region): Promise<Note[]> {
    const reactionCountsByNoteId = ReactionCountJsonLoader.loadTopNRank(region, 50);
    const noteIds = Object.keys(reactionCountsByNoteId);
    const relay = new AsyncRelay(region.relays);
    let notes: Note[] = [];

    try {
      await relay.connect();

      const noteEvents = await relay.list([{ ids: noteIds }]);
      const pubkeys = NoteLoader.uniq(noteEvents.map((note) => note.pubkey));
      const profileEvents = await relay.list([{ authors: pubkeys, kinds: [0] }]);
      const profileEventByPubkey = Object.fromEntries(
        profileEvents.map((profile) => [profile.pubkey, profile])
      );

      notes = noteEvents.reduce((acc: Note[], event: Event) => {
        if (event.id !== undefined) {
          const note = Note.fromEvent(
            event,
            profileEventByPubkey[event.pubkey],
            reactionCountsByNoteId[event.id]
          );
          acc.push(note);
        }

        return acc;
      }, []);
    } finally {
      await relay.close();
    }

    return notes;
  }

  private static uniq<T>(xs: T[]): T[] {
    return Array.from(new Set(xs));
  }
}
