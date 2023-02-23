import { describe, it, expect } from 'vitest';

import DataSource from '$lib/entities/DataSource';

describe('normalizedName', () => {
  it('returns down-cased name', () => {
    const region = { name: 'JP', relays: [] };
    const dataSource = new DataSource(region, 'Weekly');
    expect(dataSource.normalizedName()).toBe('jp');
  });
});

describe('normalizedPeriod', () => {
  it('returns down-cased name', () => {
    const region = { name: 'JP', relays: [] };
    const dataSource = new DataSource(region, 'Weekly');
    expect(dataSource.normalizedPeriod()).toBe('weekly');
  });
});

describe('normalizedFullName', () => {
  it('returns kebab-cased name', () => {
    const region = { name: 'JP', relays: [] };
    const dataSource = new DataSource(region, 'Weekly');
    expect(dataSource.normalizedFullName()).toBe('jp-weekly');
  });
});
