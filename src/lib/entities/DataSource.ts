import type Region from '$lib/entities/Region';

export default class DataSource {
  constructor(public region: Region, public period: string, public isSummary = false) {}

  public normalizedName(): string {
    return this.region.name.toLowerCase();
  }

  public normalizedPeriod(): string {
    return this.period.toLowerCase();
  }

  public normalizedFullName(): string {
    return `${this.normalizedName()}-${this.normalizedPeriod()}`;
  }

  public displayName(): string {
    return `${this.region.name}/${this.period}`;
  }
}
