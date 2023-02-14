import type { Filter, Event } from 'nostr-tools';
import nostrTools from './nostr-tools';
const { SimplePool } = nostrTools;

export default class AsyncRelay {
  private pool: typeof SimplePool;

  constructor(public urls: string[]) {
    this.pool = new SimplePool();
  }

  public async connect(): Promise<void> {
    const promises = this.urls.map((url) => {
      return this.pool.ensureRelay(url).catch(() => {
        // ignore errors
      });
    });

    await Promise.race(promises);
  }

  public async list(filters: Filter[]): Promise<Event[]> {
    return this.pool.list(this.urls, filters);
  }

  public async profiles(pubkeys: string[]): Promise<Event[]> {
    const filters = [{ authors: pubkeys, kinds: [0] }];
    const events = await this.list(filters);
    const data: { [key: string]: Event } = {};

    // Make each pubkey unique by selecting the most recent kind0
    events.forEach((event) => {
      const d = data[event.pubkey];
      if (d && new Date(event.created_at * 1000) <= new Date(d.created_at * 1000)) {
        return;
      }

      data[event.pubkey] = event;
    });

    return Object.values(data);
  }

  public async close(): Promise<void> {
    try {
      await this.pool.close();
    } catch {
      // ignore errors
    }
  }
}
