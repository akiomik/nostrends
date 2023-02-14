import nostrTools from '../lib/nostr-tools';
const { nip19 } = nostrTools;
import type { Event } from 'nostr-tools';

import Profile from './Profile';
import Tag from './Tag';

export default class Note {
  constructor(
    public id: string | undefined,
    public content: string,
    public pubkey: string,
    public createdAt: Date,
    public tags: Tag[],
    public profile: Profile | undefined,
    public reactions: number
  ) {}

  public static fromEvent(note: Event, profileOpt: Event | undefined, reactions: number): Note {
    const profile = profileOpt == undefined ? undefined : Profile.fromEvent(profileOpt);
    const tags: Tag[] = note.tags
      .map((tag) => Tag.fromEvent(tag))
      .filter((tag: Tag | undefined): tag is Tag => tag !== undefined);

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

  public modifiedContent(): string {
    let content = this.content;
    this.tags.forEach((tag, i) => {
      if (!tag.isEvent() && !tag.isPubkey()) {
        return;
      }

      const regexp = new RegExp(`#\\[${i}\\]`, 'g');
      let id: string;

      if (tag.isEvent()) {
        id = nip19.noteEncode(tag.value);
      } else {
        id = nip19.npubEncode(tag.value); // TODO: show name
      }

      content = content.replace(regexp, `@${id}`);
    });

    return content;
  }

  public nip19Id(): string | undefined {
    if (this.id === undefined) {
      return undefined;
    }

    return nip19.noteEncode(this.id);
  }
}
