export default class Tag {
  constructor(public typ: string, public value: string) {}

  public static fromEvent(tag: string[]): Tag | undefined {
    if (tag.length < 2) {
      return undefined;
    }

    return new Tag(tag[0], tag[1]);
  }

  public isEvent(): boolean {
    return this.typ === 'e';
  }

  public isPubkey(): boolean {
    return this.typ === 'p';
  }

  public isTag(): boolean {
    return this.typ === 't';
  }
}
