import type { Relay, Filter, Event } from 'nostr-tools';

export class RelayHelper {
  private constructor() {
    // noop
  }

  public static async asyncSub(relay: Relay, filters: Filter[]): Promise<Event[]> {
    const data: Event[] = [];
    const sub = relay.sub(filters);

    const promise: Promise<Event[]> = new Promise((resolve) => {
      sub.on('event', (event: Event) => {
        data.push(event);
      });

      sub.on('eose', () => {
        resolve(data);
      });
    });

    return promise;
  }
}
