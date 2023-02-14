import { describe, it, expect } from 'vitest';
import type { Event } from 'nostr-tools';

import Profile from '../../src/entities/Profile';

describe('fromEvent', () => {
  it('returns Profile', () => {
    const content = {
      website: 'https://github.com/akiomik',
      nip05: 'omi@akiomik.github.io',
      picture: 'https://1.gravatar.com/avatar/a89e4fcbb69ae9b5bd3db71fef465c00',
      lud16: 'humidnight79@walletofsatoshi.com',
      display_name: 'Akiomi Kamakura',
      about:
        'Software developer / Bird lover\n-\nAuthor of Nostrends (Trending on Nostr)\nhttps://nostrends.vercel.app',
      name: 'omi'
    };
    const event: Event = {
      id: 'foobar',
      pubkey: 'npub',
      content: JSON.stringify(content),
      kind: 0,
      created_at: 1676334894,
      tags: []
    };
    const actual = Profile.fromEvent(event);
    const expected = new Profile(
      'foobar',
      'omi',
      'Akiomi Kamakura',
      'https://1.gravatar.com/avatar/a89e4fcbb69ae9b5bd3db71fef465c00',
      'omi@akiomik.github.io',
      'npub'
    );
    expect(actual).toEqual(expected);
  });
});

describe('safePicture', () => {
  it('returns null when picture is undefined', () => {
    const profile = new Profile(undefined, 'name', 'Display Name', undefined, '', 'npub');
    expect(profile.safePicture()).toBeNull();
  });

  it('returns null when picture is a path', () => {
    const profile = new Profile(undefined, 'name', 'Display Name', '/foo/bar', '', 'npub');
    expect(profile.safePicture()).toBeNull();
  });

  it('returns null when picture is a local file', () => {
    const profile = new Profile(undefined, 'name', 'Display Name', 'file://foo/bar', '', 'npub');
    expect(profile.safePicture()).toBeNull();
  });

  it('returns trimmed url when picture is valid', () => {
    const profile = new Profile(
      undefined,
      'name',
      'Display Name',
      ' https://example.com/hoge.jpg?foo=bar ',
      '',
      'npub'
    );
    expect(profile.safePicture()).toBe('https://example.com/hoge.jpg?foo=bar');
  });
});

describe('nip19Id', () => {
  // https://github.com/nostr-protocol/nips/blob/master/19.md#examples
  it('returns encoded pubkey according to NIP-19', () => {
    const pubkey = '3bf0c63fcb93463407af97a5e5ee64fa883d107ef9e558472c4eb9aaaefa459d';
    const profile = new Profile(undefined, 'name', 'Display Name', undefined, '', pubkey);
    const expected = 'npub180cvv07tjdrrgpa0j7j7tmnyl2yr6yr7l8j4s3evf6u64th6gkwsyjh6w6';
    expect(profile.nip19Id()).toBe(expected);
  });
});
