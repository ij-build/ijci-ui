import { Project } from './project';
import { BuildLog } from './buildlog';
import { Status } from './status';

export class Build extends Status {
  public shortBuildId: string;
  public shortCommitHash: string;
  public elapsedTime: number;

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
    public queuedAt: string,
    public startedAt: string,
    public completedAt: string,
    public buildLogs: BuildLog[]
  ) {
    super(buildStatus);
    this.shortBuildId = (this.buildId || '').substring(0, 6);
    this.shortCommitHash = (this.commitHash || '').substring(0, 6);

    if (this.completedAt) {
      this.elapsedTime = (Date.parse(this.completedAt) - Date.parse(this.startedAt)) / 1000;
    }
  }

  formatElapsedTime(): string {
    if (!this.elapsedTime) {
      return '';
    }

    const t = this.elapsedTime;
    const h = Math.floor(t / 3600);
    const m = Math.floor((t - (h * 3600)) / 60);
    const s = Math.floor(t) - (h * 3600) - (m * 60);

    const sh = (h < 10) ? `0${h}` : `${h}`;
    const sm = (m < 10) ? `0${m}` : `${m}`;
    const ss = (s < 10) ? `0${s}` : `${s}`;

    if (m === 0) {
      return `${s}s`;
    }

    if (h === 0) {
      return `${sm}:${ss}`;
    }

    return `${sh}:${sm}:${ss}`;
  }

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
    this.queuedAt = other.queuedAt;
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
