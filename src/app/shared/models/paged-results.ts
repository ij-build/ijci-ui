export class PagedResults<E> {
  constructor (
    public items: E[],
    public page: number,
    public numPages: number,
    public pager: (number) => Promise<PagedResults<E>>
  ) { }

  public getPage(page: number): Promise<PagedResults<E>> {
    return this.pager(page);
  }
}
