export default interface ReactionCountSummary {
  // note id
  [key: string]: {
    // kind: count
    [key: string]: number;
  };
}
