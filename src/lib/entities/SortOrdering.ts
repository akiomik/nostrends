const SortOrdering = {
  MostPopular: 'most-popular',
  RecentlyPosted: 'recently-posted',
  LeastRecentlyPosted: 'least-recently-posted'
};

type SortOrdering = (typeof SortOrdering)[keyof typeof SortOrdering];

export default SortOrdering;
