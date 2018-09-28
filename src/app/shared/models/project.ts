import { Build } from './build';

export class Project {
  constructor(
    public projectId: string,
    public name: string,
    public repositoryUrl: string,
    public lastBuildId: string,
    public lastBuildStatus: string,
    public lastBuildCompletedAt: string,
  ) { }

  isSucceeded(): boolean {
    return this.lastBuildStatus === 'succeeded';
  }
}
