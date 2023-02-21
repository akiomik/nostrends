import { describe, it, expect } from 'vitest';

import DataSource from '$lib/entities/DataSource';

describe('normalizedName', () => {
  it('returns down-cased name', () => {
    const dataSource = new DataSource('JP', 'Weekly', []);
    expect(dataSource.normalizedName()).toBe('jp');
  });
});

describe('normalizedPeriod', () => {
  it('returns down-cased name', () => {
    const dataSource = new DataSource('JP', 'Weekly', []);
    expect(dataSource.normalizedPeriod()).toBe('weekly');
  });
});

describe('normalizedFullName', () => {
  it('returns kebab-cased name', () => {
    const dataSource = new DataSource('JP', 'Weekly', []);
    expect(dataSource.normalizedFullName()).toBe('jp-weekly');
  });
});
