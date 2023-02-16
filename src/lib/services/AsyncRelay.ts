import type { Filter, Event } from 'nostr-tools';
import nostrTools from '$lib/packages/nostr-tools';
const { SimplePool } = nostrTools;

import Note from '$lib/entities/Note';
import Profile from '$lib/entities/Profile';

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
    // return await this.pool.get(this.urls, filters);
    const events = await this.pool.list(this.urls, filters);
    return events[0];
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
