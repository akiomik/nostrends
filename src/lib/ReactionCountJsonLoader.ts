type ReactionCount = { [key: string]: number };

export class ReactionCountJsonLoader {
  private constructor() {
    // noop
  }

  public static load(region: string): ReactionCount {
    const reactionCountsByRegion: ReactionCount = {};
    const eventJsonModules = import.meta.glob(`../events/**/*.json`, { eager: true });
    Object.entries(eventJsonModules).forEach(([path, mod]) => {
      if (!path.includes(region)) {
        return;
      }

      const { default: reactionCount } = mod as { default: ReactionCount };
      Object.entries(reactionCount).forEach(([k, v]) => {
        if (reactionCountsByRegion[k]) {
          reactionCountsByRegion[k] += v;
        } else {
          reactionCountsByRegion[k] = v;
        }
      });
    });

    return reactionCountsByRegion;
  }

  public static loadTopNRank(region: string, n: number): ReactionCount {
    const reactionCounts = ReactionCountJsonLoader.load(region);
    const counts = Object.values(reactionCounts);
    counts.sort((a, b) => b - a);
    const lowerCount = counts.slice(0, n).at(-1); // top-N
    if (lowerCount === undefined) {
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
