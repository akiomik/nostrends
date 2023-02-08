type EventCount = { [key: string]: number };

export class EventCountJsonLoader {
	private constructor() {
		// noop
	}

	public static loadTopNRank(n: number): EventCount {
		const eventCounts: EventCount = {};
		const eventJsonModules = import.meta.glob('../events/*.json', { eager: true });
		Object.values(eventJsonModules).forEach((mod) => {
			const { default: eventCount } = mod as { default: EventCount };
			Object.entries(eventCount).forEach(([k, v]) => {
				if (eventCounts[k]) {
					eventCounts[k] += v;
				} else {
					eventCounts[k] = v;
				}
			});
		});

		const counts = Object.values(eventCounts);
		counts.sort((a, b) => b - a);
		const lowerCount = counts.slice(0, n).at(-1); // top-N
		if (lowerCount == null) {
			return {};
		}

		Object.keys(eventCounts).forEach((key) => {
			if (eventCounts[key] < lowerCount) {
				delete eventCounts[key];
			}
		});

		return eventCounts;
	}
}
