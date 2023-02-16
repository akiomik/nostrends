import { browser } from '$app/environment';
import { globalRegion, jpRegion } from '$lib/entities/Regions';
import type Note from '$lib/entities/Note';
import NoteLoader from '$lib/services/NoteLoader';

export async function load() {
  const regions = [globalRegion, jpRegion];
  const notesByRegion: { [key: string]: Promise<Note[]> } = {};

  if (browser) {
    regions.forEach((region) => {
      notesByRegion[region.name] = NoteLoader.load(region);
    });
  }

  return {
    regions,
    notesByRegion
  };
}
