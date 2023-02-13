import { describe, it, expect } from 'vitest';

import Note from '../../src/entities/Note';

describe('nip19Id', () => {
  it('returns nil if id is null', () => {
    const note = new Note(null, 'foo', 'npub', new Date(), [], null, 0);
    expect(note.nip19Id()).toBeNull();
  });

  it('returns encoded id according to NIP-19', () => {
    const id = '20d60ff68d61d15cd0f7fb3c8975c8c4b874b8406e3ef0163193ed60a18692ef';
    const note = new Note(id, 'foo', 'npub', new Date(), [], null, 0);
    expect(note.nip19Id()).toBe('note1yrtqla5dv8g4e58hlv7gjawgcju8fwzqdcl0q933j0kkpgvxjthsdqd937');
  });
});
