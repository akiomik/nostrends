export default class DataSource {
  constructor(
    public name: string,
    public period: string,
    public relays: string[],
    public isSummary = false
  ) {}

  public normalizedName(): string {
    return this.name.toLowerCase();
  }

  public normalizedPeriod(): string {
    return this.period.toLowerCase();
  }

  public normalizedFullName(): string {
    return `${this.normalizedName()}-${this.normalizedPeriod()}`;
  }

  public displayName(): string {
    return `${this.name}/${this.period}`;
  }
}
