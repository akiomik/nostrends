import type { Filter, Event } from 'nostr-tools';
import nostrTools from '$lib/packages/nostr-tools';
const { SimplePool } = nostrTools;

import Note from '$lib/entities/Note';
import Profile from '$lib/entities/Profile';

export default class AsyncRelay {
  private pool: typeof SimplePool;
  private availableUrls: string[] = [];

  constructor(public urls: string[]) {
    this.pool = new SimplePool();
  }

  // NOTE: Temporarily increasing the timeout to avoid a bug in Blink :cry:
  public async connect(timeoutInMillis = 3000): Promise<void> {
    const promises = this.urls.map((url) => {
      return this.ensureRelay(url, timeoutInMillis).catch(() => {
        // ignore connection and timeout errors
      });
    });

    await Promise.all(promises);
  }

  public async ensureRelay(url: string, timeoutInMillis: number): Promise<void> {
    const promise = this.pool.ensureRelay(url).then(({ url }: { url: string }) => {
      console.log(`connected to ${url}`);
      this.availableUrls.push(url);
    });

    // support both node and browser types (https://stackoverflow.com/a/56239226/1918609)
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const timeout = new Promise((_resolve, reject) => {
      timeoutId = setTimeout(() => reject(), timeoutInMillis);
    }).finally(() => {
      clearTimeout(timeoutId);
    });

    return Promise.race([promise, timeout]);
  }

  public async getNote(id: string): Promise<Note | undefined> {
    const filters = [{ ids: [id] }];
    const event = await this.get(filters);
    if (event === null || event === undefined) {
      return undefined;
    }

    return Note.fromEvent(event);
  }

  public async getProfile(pubkey: string): Promise<Profile | undefined> {
    const filters = [{ authors: [pubkey], kinds: [0] }];
    const events = await this.list(filters);

    // Selecting the most recent kind0
    return events.reduce((acc: Profile | undefined, event: Event) => {
      const profile = Profile.fromEvent(event);
      if (acc === undefined || acc.createdAt < profile.createdAt) {
        return profile;
      }

      return acc;
    }, undefined);
  }

  public async get(filters: Filter[]): Promise<Event | undefined> {
    // NOTE: this.pool.get does not works...
    // return await this.pool.get(this.availableUrls, filters);
    const events = await this.list(filters);
    return events[0];
  }

  public async list(filters: Filter[]): Promise<Event[]> {
    return this.pool.list(this.availableUrls, filters);
  }

  public async close(): Promise<void> {
    try {
      this.availableUrls = [];
      await this.pool.close();
    } catch {
      // ignore errors
    }
  }
}
