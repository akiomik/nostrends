import nostrTools from '../lib/nostr-tools';
const { nip19 } = nostrTools;
import type { Event } from 'nostr-tools';

export default class Profile {
  constructor(
    public id: string | undefined,
    public name: string,
    public displayName: string,
    public picture: string | undefined,
    public nip05: string,
    public pubkey: string
  ) {}

  public static fromEvent(event: Event): Profile {
    const content = JSON.parse(event.content);
    return new Profile(
      event.id,
      content.name,
      content.display_name,
      content.picture,
      content.nip05,
      event.pubkey
    );
  }

  public safePicture(): string | undefined {
    if (this.picture === undefined) {
      return undefined;
    }

    try {
      const url = new URL(this.picture);
      if (!url.protocol.startsWith('http')) {
        return undefined;
      }

      return url.toString();
    } catch {
      return undefined;
    }
  }

  public nip19Id(): string {
    return nip19.npubEncode(this.pubkey);
  }
}
