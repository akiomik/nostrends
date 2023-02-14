import nostrTools from '../lib/nostr-tools';
const { nip19 } = nostrTools;
import type { Event } from 'nostr-tools';

export default class Profile {
  constructor(
    public id: string | undefined,
    public name: string,
    public displayName: string,
    public picture: string | undefined,
    public nip05: string | undefined,
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

    if (this.picture.startsWith('data:image')) {
      return this.picture;
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

  public formattedNip05(): string {
    if (this.nip05 === undefined) {
      return '';
    }

    const nip05 = this.nip05.split('@');
    if (nip05.length === 2 && nip05[0] === '_') {
      return nip05[1];
    }

    return this.nip05;
  }
}
