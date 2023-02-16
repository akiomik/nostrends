import { describe, it, expect } from 'vitest';

import Region from '$lib/entities/Region';

describe('normalizedName', () => {
  it('returns down-cased name', () => {
    const region = new Region('JP', []);
    expect(region.normalizedName()).toBe('jp');
  });
});
