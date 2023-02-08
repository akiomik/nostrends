type ReactionCount = { [key: string]: number };

export class ReactionCountJsonLoader {
  private constructor() {
    // noop
  }

  public static loadTopNRank(n: number): ReactionCount {
    const reactionCounts: ReactionCount = {};
    const eventJsonModules = import.meta.glob('../events/*.json', { eager: true });
    Object.values(eventJsonModules).forEach((mod) => {
      const { default: reactionCount } = mod as { default: ReactionCount };
      Object.entries(reactionCount).forEach(([k, v]) => {
        if (reactionCounts[k]) {
          reactionCounts[k] += v;
        } else {
          reactionCounts[k] = v;
        }
      });
    });

    const counts = Object.values(reactionCounts);
    counts.sort((a, b) => b - a);
    const lowerCount = counts.slice(0, n).at(-1); // top-N
    if (lowerCount == null) {
      return {};
    }

    Object.keys(reactionCounts).forEach((key) => {
      if (reactionCounts[key] < lowerCount) {
        delete reactionCounts[key];
      }
    });

    return reactionCounts;
  }
}
