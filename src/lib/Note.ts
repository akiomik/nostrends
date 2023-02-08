import { nip19 } from 'nostr-tools';
import type { Event } from 'nostr-tools';

import { Profile } from './Profile';
import { Tag } from './Tag';

export class Note {
  constructor(
    public id: string | undefined,
    public content: string,
    public pubkey: string,
    public createdAt: Date,
    public tags: Tag[],
    public profile: Profile | null,
    public reactions: number
  ) {}

  public static fromEvent(note: Event, profileOpt: Event | null, reactions: number): Note {
    const profile = profileOpt == null ? null : Profile.fromEvent(profileOpt);
    const tags: Tag[] = note.tags
      .map((tag) => Tag.fromEvent(tag))
      .filter((tag: Tag | null): tag is Tag => tag !== null);

    return new Note(
      note.id,
      note.content,
      note.pubkey,
      new Date(note.created_at * 1000),
      tags,
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
