import { browser } from '$app/environment';
import { globalRegion, jpRegion } from '../entities/Regions';
import type Note from '../entities/Note';
import NoteLoader from '../lib/NoteLoader';

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
