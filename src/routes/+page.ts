import { browser } from '$app/environment';
import { globalWeekly, globalDaily, jpWeekly, jpDaily } from '$lib/entities/DataSources';
import type Note from '$lib/entities/Note';
import NoteLoader from '$lib/services/NoteLoader';
import SummaryNoteLoader from '$lib/services/SummaryNoteLoader';
import NostrClient from '$lib/services/NostrClient';

export async function load() {
  const dataSources = [globalWeekly, globalDaily, jpWeekly, jpDaily];
  const asyncNotesByDataSource: { [key: string]: Promise<Promise<Note | undefined>[]> } = {};
  const globalClient = new NostrClient(globalDaily.region.relays);
  const jpClient = new NostrClient(jpDaily.region.relays);
  const globalLoader = new NoteLoader(globalClient);
  const jpLoader = new NoteLoader(jpClient);
  const globalSummaryLoader = new SummaryNoteLoader(globalClient);
  const jpSummaryLoader = new SummaryNoteLoader(jpClient);

  if (browser) {
    dataSources.forEach((dataSource) => {
      if (dataSource.isSummary) {
        if (dataSource.region.name === 'JP') {
          asyncNotesByDataSource[dataSource.normalizedFullName()] =
            jpSummaryLoader.load(dataSource);
        } else {
          asyncNotesByDataSource[dataSource.normalizedFullName()] =
            globalSummaryLoader.load(dataSource);
        }
      } else {
        if (dataSource.region.name === 'JP') {
          asyncNotesByDataSource[dataSource.normalizedFullName()] = jpLoader.load(dataSource);
        } else {
          asyncNotesByDataSource[dataSource.normalizedFullName()] = globalLoader.load(dataSource);
        }
      }
    });
  }

  return {
    dataSources,
    asyncNotesByDataSource
  };
}
