import type { Event } from 'nostr-tools';

export class Profile {
  constructor(public id: string | undefined, public name: string, public pubkey: string) {}

  public static fromEvent(event: Event): Profile {
    const content = JSON.parse(event.content);
    return new Profile(event.id, content.name, event.pubkey);
  }
}
