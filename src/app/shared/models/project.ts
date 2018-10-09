import { Build } from './build';
import { Status } from './status';

export class Project extends Status {
  constructor(
    public projectId: string,
    public name: string,
    public repositoryUrl: string,
    public lastBuildId: string,
    public lastBuildStatus: string,
    public lastBuildCompletedAt: string,
  ) {
    super(lastBuildStatus);
  }
}
