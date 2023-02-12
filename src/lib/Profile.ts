import nostrTools from './nostr-tools';
const { nip19 } = nostrTools;
import type { Event } from 'nostr-tools';

export class Profile {
  constructor(
    public id: string | undefined,
    public name: string,
    public displayName: string,
    public picture: string,
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

  public nip19Id(): string | null {
    if (this.id == null) {
      return null;
    }

    return nip19.noteEncode(this.id);
  }
}
