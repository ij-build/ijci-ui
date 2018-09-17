import { Project } from './project';

export class Build {
  constructor(
    public project: Project,
    public buildId: string,
    public buildStatus: string,
    public agentAddr: string,
    public commitBranch: string,
    public commitHash: string,
    public commitMessage: string,
    public commitAuthorName: string,
    public commitAuthorEmail: string,
    public commitAuthoredAt: string,
    public commitCommitterName: string,
    public commitCommitterEmail: string,
    public commitCommittedAt: string,
    public errorMessage: string,
    public createdAt: string,
    public startedAt: string,
    public completedAt: string,
    public buildLogs: BuildLog[]
  ) { }

  isQueued(): boolean { return this.buildStatus === 'queued'; }
  isInProgress(): boolean { return this.buildStatus === 'in-progress'; }
  isSucceeded(): boolean { return this.buildStatus == 'succeeded' };
  isFailed(): boolean { return this.buildStatus == 'failed' };
  isErrored(): boolean { return this.buildStatus == 'errored' };
  isTerminal(): boolean { return !this.isQueued() && !this.isInProgress(); }

  lastUpdatedAt(): string {
    return this.completedAt || this.startedAt || this.createdAt;
  }

  merge(other: Build): void {
    this.buildStatus = other.buildStatus;
    this.agentAddr = other.agentAddr;
    this.commitBranch = other.commitBranch;
    this.commitHash = other.commitHash;
    this.commitMessage = other.commitMessage;
    this.commitAuthorName = other.commitAuthorName;
    this.commitAuthorEmail = other.commitAuthorEmail;
    this.commitAuthoredAt = other.commitAuthoredAt;
    this.commitCommitterName = other.commitCommitterName;
    this.commitCommitterEmail = other.commitCommitterEmail;
    this.commitCommittedAt = other.commitCommittedAt;
    this.errorMessage = other.errorMessage;
    this.startedAt = other.startedAt;
    this.completedAt = other.completedAt;

    for (const buildLog of other.buildLogs) {
      if (!this.hasBuildLog(buildLog.buildLogId)) {
        this.buildLogs.push(buildLog);
      }
    }
  }

  hasBuildLog(buildLogId: string): boolean {
    return this.buildLogs.some(b => b.buildLogId === buildLogId);
  }
}

export class BuildLog {
  constructor(
    public buildLogId: string,
    public name: string,
    public createdAt: string,
    public uploadedAt: string,
    public content: string
  ) { }
}
