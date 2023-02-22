import type DataSource from '$lib/entities/DataSource';

type ReactionCount = { [key: string]: number };

export class ReactionCountJsonLoader {
  private constructor() {
    // noop
  }

  public static load(dataSource: DataSource): ReactionCount {
    const reactionCountById: ReactionCount = {};
    const eventJsonModules = import.meta.glob(`$lib/events/**/*.json`, { eager: true });
    let latestJsonName: string | undefined;

    Object.entries(eventJsonModules).forEach(([path, mod]) => {
      if (!path.includes(dataSource.normalizedName())) {
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

      if (latestJsonName === undefined || latestJsonName < path) {
        latestJsonName = path;
      }
    });

    const noteIdCount = Object.keys(reactionCountById).length;
    const jsonCount = Object.keys(eventJsonModules).length;
    console.log(
      `[${dataSource.normalizedFullName()}] ${jsonCount} json files are loaded contains ${noteIdCount}`
    );
    console.log(`[${dataSource.normalizedFullName()}] The latest json file is ${latestJsonName}.`);

    return reactionCountById;
  }

  public static loadTopNRank(dataSource: DataSource, n: number): ReactionCount {
    const reactionCounts = ReactionCountJsonLoader.load(dataSource);
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
