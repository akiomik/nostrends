import { nip19 } from 'nostr-tools';
import type { Event } from 'nostr-tools';

import { Profile } from './Profile';

export class Note {
  constructor(
    public id: string | undefined,
    public content: string,
    public pubkey: string,
    public createdAt: Date,
    public profile: Profile | null,
    public reactions: number
  ) {}

  public static fromEvent(note: Event, profileOpt: Event | null, reactions: number): Note {
    const profile = profileOpt == null ? null : Profile.fromEvent(profileOpt);
    return new Note(
      note.id,
      note.content,
      note.pubkey,
      new Date(note.created_at * 1000),
      profile,
      reactions
    );
  }

  public nip19Id(): string | null {
    if (this.id == null) {
      return null;
    }

    return nip19.noteEncode(this.id);
  }
}
