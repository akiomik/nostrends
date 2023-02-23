import type Note from '$lib/entities/Note';
import type DataSource from '$lib/entities/DataSource';
import type NostrClient from '$lib/services/NostrClient';
import { ReactionCountJsonLoader } from '$lib/services/ReactionCountJsonLoader';

export default class NoteLoader {
  constructor(public client: NostrClient) {}

  public async load(dataSource: DataSource): Promise<Promise<Note | undefined>[]> {
    const reactionCountsByNoteId = ReactionCountJsonLoader.loadTopNRank(dataSource, 50);
    const noteIds = Object.keys(reactionCountsByNoteId);
    const asyncNotes: Promise<Note | undefined>[] = [];

    console.log(`[${dataSource.normalizedFullName()}] ${noteIds.length} notes are loading.`);

    try {
      await this.client.connect();

      noteIds.forEach((id) => {
        const asyncNote = this.client.getNote(id).then((note: Note | undefined) => {
          if (note?.id) {
            const reactions = reactionCountsByNoteId[note.id];
            note.setReactions(reactions);
          }

          if (note) {
            const asyncProfile = this.client.getProfile(note.pubkey);
            note.setAsyncProfile(asyncProfile);
          }

          return note;
        });

        asyncNotes.push(asyncNote);
      });
    } finally {
      // TODO: close connections when all promises are resolved
      // await this.client.close();
    }

    return asyncNotes;
  }
}
