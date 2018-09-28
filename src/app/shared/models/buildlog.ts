export class BuildLog {
  constructor(
    public buildLogId: string,
    public name: string,
    public createdAt: string,
    public uploadedAt: string,
    public content: string
  ) { }
}
