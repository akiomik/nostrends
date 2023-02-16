import { describe, it, expect, vi, afterEach } from 'vitest';
import type { Event } from 'nostr-tools';
import { nip05 } from 'nostr-tools';

import Profile from '$lib/entities/Profile';

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
    expect(profile.safePicture()).toBeUndefined();
  });

  it('returns null when picture is a path', () => {
    const profile = new Profile(undefined, 'name', 'Display Name', '/foo/bar', '', 'npub');
    expect(profile.safePicture()).toBeUndefined();
  });

  it('returns null when picture is a local file', () => {
    const profile = new Profile(undefined, 'name', 'Display Name', 'file://foo/bar', '', 'npub');
    expect(profile.safePicture()).toBeUndefined();
  });

  it('returns picture when picture is a data url', () => {
    const picture =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2NgYGD4DwABBAEAcCBlCwAAAABJRU5ErkJggg==';
    const profile = new Profile(undefined, 'name', 'Display Name', picture, '', 'npub');
    expect(profile.safePicture()).toBe(picture);
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

describe('formattedNip05', () => {
  it('returns empty when nip05 is undefined', () => {
    const profile = new Profile(undefined, 'name', 'Display Name', undefined, undefined, 'npub');
    expect(profile.formattedNip05()).toBe('');
  });

  it('returns empty when nip05 is empty', () => {
    const profile = new Profile(undefined, 'name', 'Display Name', undefined, '', 'npub');
    expect(profile.formattedNip05()).toBe('');
  });

  it('returns domain when nip05 is only domain', () => {
    const name = 'example.com';
    const profile = new Profile(undefined, 'name', 'Display Name', undefined, name, 'npub');
    expect(profile.formattedNip05()).toBe(name);
  });

  it('returns domain when name of nip05 is `_`', () => {
    const name = '_@example.com';
    const profile = new Profile(undefined, 'name', 'Display Name', undefined, name, 'npub');
    expect(profile.formattedNip05()).toBe('example.com');
  });

  it('returns fullname when nip05 is fullname', () => {
    const name = 'foo@example.com';
    const profile = new Profile(undefined, 'name', 'Display Name', undefined, name, 'npub');
    expect(profile.formattedNip05()).toBe(name);
  });
});

describe('isNip05Valid', async () => {
  afterEach(() => {
    vi.restoreAllMocks();
    nip05.useFetchImplementation(fetch);
  });

  it('returns false when nip05 is undefined', async () => {
    const profile = new Profile(undefined, 'name', 'Display Name', undefined, undefined, 'npub');
    await expect(profile.isNip05Valid()).resolves.toBe(false);
  });

  it('returns false when nip05 is empty', async () => {
    const profile = new Profile(undefined, 'name', 'Display Name', undefined, '', 'npub');
    await expect(profile.isNip05Valid()).resolves.toBe(false);
  });

  it('returns false when nip05 is invalid', async () => {
    const mock = vi.fn().mockImplementation(() => {
      return { json: () => ({ names: { foo: 'bar' } }) };
    });
    nip05.useFetchImplementation(mock);

    const name = 'johndoe@example.com';
    const profile = new Profile(undefined, 'name', 'Display Name', undefined, name, 'npub');
    await expect(profile.isNip05Valid()).resolves.toBe(false);
  });

  it('returns false when `fetch` throws exception', async () => {
    const mock = vi.fn().mockImplementation(() => {
      throw new Error('failed');
    });
    nip05.useFetchImplementation(mock);

    const name = 'johndoe@example.com';
    const profile = new Profile(undefined, 'name', 'Display Name', undefined, name, 'npub');
    await expect(profile.isNip05Valid()).resolves.toBe(false);
  });

  it('returns true when nip05 is valid', async () => {
    const mock = vi.fn().mockImplementation(() => {
      return { json: () => ({ names: { foo: 'bar' } }) };
    });
    nip05.useFetchImplementation(mock);

    const name = 'foo@example.com';
    const profile = new Profile(undefined, 'name', 'Display Name', undefined, name, 'npub');
    await expect(profile.isNip05Valid()).resolves.toBe(true);
  });
});
