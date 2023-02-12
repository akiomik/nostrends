import nostrTools from './nostr-tools';
const { relayInit } = nostrTools;
import type { Relay, Filter, Event } from 'nostr-tools';

export default class AsyncRelay {
  private relay: Relay;

  constructor(public url: string) {
    this.relay = relayInit(url);
  }

  public async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.relay.connect();
      this.relay.on('connect', () => resolve());
      this.relay.on('error', () => reject());
    });
  }

  public async sub(filters: Filter[]): Promise<Event[]> {
    const data: Event[] = [];

    return new Promise((resolve) => {
      const sub = this.relay.sub(filters);

      sub.on('event', (event: Event) => {
        data.push(event);
      });

      sub.on('eose', () => {
        resolve(data);
      });
    });
  }

  public async close(): Promise<void> {
    return this.relay.close();
  }
}
