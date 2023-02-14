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

  public async close(): Promise<void> {
    try {
      await this.pool.close();
    } catch {
      // ignore errors
    }
  }
}
