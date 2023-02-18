import type Region from '$lib/entities/Region';

type ReactionCount = { [key: string]: number };

export class ReactionCountJsonLoader {
  private constructor() {
    // noop
  }

  public static load(region: Region): ReactionCount {
    const reactionCountById: ReactionCount = {};
    const eventJsonModules = import.meta.glob(`$lib/events/**/*.json`, { eager: true });
    Object.entries(eventJsonModules).forEach(([path, mod]) => {
      if (!path.includes(region.normalizedName())) {
        return;
      }

      const { default: reactionCount } = mod as { default: ReactionCount };
      Object.entries(reactionCount).forEach(([k, v]) => {
        if (reactionCountById[k]) {
          reactionCountById[k] += v;
        } else {
          reactionCountById[k] = v;
        }
      });
    });

    return reactionCountById;
  }

  public static loadTopNRank(region: Region, n: number): ReactionCount {
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
