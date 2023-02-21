import { browser } from '$app/environment';
import { globalWeekly, globalDaily, jpWeekly, jpDaily } from '$lib/entities/DataSources';
import type Note from '$lib/entities/Note';
import NoteLoader from '$lib/services/NoteLoader';
import SummaryNoteLoader from '$lib/services/SummaryNoteLoader';

export async function load() {
  const dataSources = [globalWeekly, globalDaily, jpWeekly, jpDaily];
  const asyncNotesByDataSource: { [key: string]: Promise<Promise<Note | undefined>[]> } = {};

  if (browser) {
    dataSources.forEach((dataSource) => {
      if (dataSource.isSummary) {
        asyncNotesByDataSource[dataSource.normalizedFullName()] =
          SummaryNoteLoader.load(dataSource);
      } else {
        asyncNotesByDataSource[dataSource.normalizedFullName()] = NoteLoader.load(dataSource);
      }
    });
  }

  return {
    dataSources,
    asyncNotesByDataSource
  };
}
