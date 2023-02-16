export default class Region {
  constructor(public name: string, public relays: string[]) {}

  public normalizedName(): string {
    return this.name.toLowerCase();
  }
}
