import { describe, it, expect } from 'vitest';
import type { Event } from 'nostr-tools';

import Note from '../../src/entities/Note';
import Tag from '../../src/entities/Tag';

describe('fromEvent', () => {
  it('returns Note', () => {
    const event: Event = {
      id: 'foobar',
      pubkey: 'npub',
      content: 'Hello, world!',
      kind: 1,
      created_at: 1676328835,
      tags: [['t', 'nostrends']]
    };
    const actual = Note.fromEvent(event, undefined, 42);
    const expected = new Note(
      'foobar',
      'Hello, world!',
      'npub',
      new Date('2023-02-14T07:53:55+09:00'),
      [new Tag('t', 'nostrends')],
      undefined,
      42
    );
    expect(actual).toEqual(expected);
  });
});

describe('modifiedContent', () => {
  it('returns original content when tags are empty', () => {
    const content = 'Hello, world!';
    const note = new Note(undefined, content, 'npub', new Date(), [], undefined, 0);
    expect(note.modifiedContent()).toBe(content);
  });

  it('returns original content when tag is `t`', () => {
    const content = 'Hello, #[0] world!';
    const tags = [new Tag('t', 'nostrends')];
    const note = new Note(undefined, content, 'npub', new Date(), tags, undefined, 0);
    expect(note.modifiedContent()).toBe(content);
  });

  it('replaces #[1] to note id', () => {
    const content =
      '#nostrends でリンクの開き先をアプリに変更できるようになりました🤙\n\nデフォルトはnostr.socialなので、アプリで開きたい場合は右上の歯車アイコンから設定してみてね\n\n#[1]';
    const tags = [
      new Tag('t', 'nostrends'),
      new Tag('e', '20d60ff68d61d15cd0f7fb3c8975c8c4b874b8406e3ef0163193ed60a18692ef')
    ];
    const note = new Note(undefined, content, 'npub', new Date(), tags, undefined, 0);
    const expected =
      '#nostrends でリンクの開き先をアプリに変更できるようになりました🤙\n\nデフォルトはnostr.socialなので、アプリで開きたい場合は右上の歯車アイコンから設定してみてね\n\n@note1yrtqla5dv8g4e58hlv7gjawgcju8fwzqdcl0q933j0kkpgvxjthsdqd937';
    expect(note.modifiedContent()).toBe(expected);
  });

  it('replaces #[0] to profile id', () => {
    const content = 'Hello, #[0] world!';
    const tags = [new Tag('p', '4d39c23b3b03bf99494df5f3a149c7908ae1bc7416807fdd6b34a31886eaae25')];
    const note = new Note(undefined, content, 'npub', new Date(), tags, undefined, 0);
    const expected =
      'Hello, @npub1f5uuywemqwlejj2d7he6zjw8jz9wr0r5z6q8lhttxj333ph24cjsymjmug world!';
    expect(note.modifiedContent()).toBe(expected);
  });
});

describe('nip19Id', () => {
  it('returns nil if id is undefined', () => {
    const note = new Note(undefined, 'foo', 'npub', new Date(), [], undefined, 0);
    expect(note.nip19Id()).toBeUndefined();
  });

  it('returns encoded id according to NIP-19', () => {
    const id = '20d60ff68d61d15cd0f7fb3c8975c8c4b874b8406e3ef0163193ed60a18692ef';
    const note = new Note(id, 'foo', 'npub', new Date(), [], undefined, 0);
    expect(note.nip19Id()).toBe('note1yrtqla5dv8g4e58hlv7gjawgcju8fwzqdcl0q933j0kkpgvxjthsdqd937');
  });
});
