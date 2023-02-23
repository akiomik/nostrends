import type Note from '$lib/entities/Note';
import type DataSource from '$lib/entities/DataSource';
import NostrClient from '$lib/services/NostrClient';
import { ReactionCountJsonLoader } from '$lib/services/ReactionCountJsonLoader';

export default class NoteLoader {
  private constructor() {
    // noop
  }

  public static async load(dataSource: DataSource): Promise<Promise<Note | undefined>[]> {
    const reactionCountsByNoteId = ReactionCountJsonLoader.loadTopNRank(dataSource, 50);
    const noteIds = Object.keys(reactionCountsByNoteId);
    const relay = new NostrClient(dataSource.relays);
    const asyncNotes: Promise<Note | undefined>[] = [];

    console.log(`[${dataSource.normalizedFullName()}] ${noteIds.length} notes are loading.`);

    try {
      await relay.connect();

      noteIds.forEach((id) => {
        const asyncNote = relay.getNote(id).then((note: Note | undefined) => {
          if (note?.id) {
            const reactions = reactionCountsByNoteId[note.id];
            note.setReactions(reactions);
          }

          if (note) {
            const asyncProfile = relay.getProfile(note.pubkey);
            note.setAsyncProfile(asyncProfile);
          }

          return note;
        });

        asyncNotes.push(asyncNote);
      });
    } finally {
      // TODO: close connections when all promises are resolved
      // await relay.close();
    }

    return asyncNotes;
  }
}
