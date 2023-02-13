export const SortOrdering = {
  MostPopular: 'most-popular',
  RecentlyPosted: 'recently-posted',
  LeastRecentlyPosted: 'least-recently-posted'
};

export type SortOrdering = (typeof SortOrdering)[keyof typeof SortOrdering];
