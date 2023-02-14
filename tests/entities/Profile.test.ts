import { describe, it, expect } from 'vitest';
import type { Event } from 'nostr-tools';

import Profile from '../../src/entities/Profile';

describe('nip19Id', () => {
  // https://github.com/nostr-protocol/nips/blob/master/19.md#examples
  it('returns encoded pubkey according to NIP-19', () => {
    const pubkey = '3bf0c63fcb93463407af97a5e5ee64fa883d107ef9e558472c4eb9aaaefa459d';
    const profile = new Profile(undefined, 'name', 'Display Name', undefined, '', pubkey);
    const expected = 'npub180cvv07tjdrrgpa0j7j7tmnyl2yr6yr7l8j4s3evf6u64th6gkwsyjh6w6';
    expect(profile.nip19Id()).toBe(expected);
  });
});
