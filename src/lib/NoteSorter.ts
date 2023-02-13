import type { Note } from './Note';
import { SortOrdering } from './SortOrdering';

export default class NoteSorter {
  constructor(public notes: Note[]) {}

  public sort(order: SortOrdering): Note[] {
    return [...this.notes].sort((a: Note, b: Note) => {
      switch (order) {
        case SortOrdering.MostPopular:
          return b.reactions - a.reactions;
        case SortOrdering.RecentlyPosted:
          return b.createdAt.getTime() - a.createdAt.getTime();
        case SortOrdering.LeastRecentlyPosted:
          return a.createdAt.getTime() - b.createdAt.getTime();
        default:
          return 0;
      }
    });
  }
}
