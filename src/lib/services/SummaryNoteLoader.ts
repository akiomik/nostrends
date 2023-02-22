import type Note from '$lib/entities/Note';
import type DataSource from '$lib/entities/DataSource';
import AsyncRelay from '$lib/services/AsyncRelay';
import globalDailySummary from '$lib/summaries/global/daily.json';
import jpDailySummary from '$lib/summaries/jp/daily.json';
import type ReactionCountSummary from '$lib/entities/ReactionCountSummary';

export default class SummaryNoteLoader {
  private constructor() {
    // noop
  }

  public static async load(dataSource: DataSource): Promise<Promise<Note | undefined>[]> {
    let reactionCountsByNoteId: ReactionCountSummary;
    if (dataSource.name === 'JP') {
      reactionCountsByNoteId = jpDailySummary as ReactionCountSummary;
    } else {
      reactionCountsByNoteId = globalDailySummary as ReactionCountSummary;
    }

    const noteIds = Object.keys(reactionCountsByNoteId);
    const relay = new AsyncRelay(dataSource.relays);
    const asyncNotes: Promise<Note | undefined>[] = [];

    console.log(`[${dataSource.normalizedFullName()}] ${noteIds.length} notes are loading.`);

    try {
      await relay.connect();

      noteIds.forEach((id) => {
        const asyncNote = relay.getNote(id).then((note: Note | undefined) => {
          if (note?.id) {
            const countByKind = reactionCountsByNoteId[note.id];
            note.setReactions(Object.values(countByKind).reduce((acc, a) => acc + a, 0));
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
