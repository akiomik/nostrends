import type Note from '$lib/entities/Note';
import type Region from '$lib/entities/Region';
import AsyncRelay from '$lib/services/AsyncRelay';
import { ReactionCountJsonLoader } from '$lib/services/ReactionCountJsonLoader';

export default class NoteLoader {
  private constructor() {
    // noop
  }

  public static async load(region: Region): Promise<Promise<Note | undefined>[]> {
    const reactionCountsByNoteId = ReactionCountJsonLoader.loadTopNRank(region, 50);
    const noteIds = Object.keys(reactionCountsByNoteId);
    const relay = new AsyncRelay(region.relays);
    const asyncNotes: Promise<Note | undefined>[] = [];

    try {
      await relay.connect();

      noteIds.forEach((id) => {
        asyncNotes.push(
          relay.getNote(id).then((note: Note | undefined) => {
            if (note?.id) {
              const reactions = reactionCountsByNoteId[note.id];
              note.setReactions(reactions);
            }

            if (note) {
              const asyncProfile = relay.getProfile(note.pubkey);
              note.setAsyncProfile(asyncProfile);
            }

            return note;
          })
        );
      });
    } finally {
      await relay.close();
    }

    return asyncNotes;
  }
}
