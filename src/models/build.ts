import { buildLogFromApi, IBuildLog } from './build_log'
import { IProject, projectFromApi } from './project'

export interface IBuild {
    agentAddr: string | null
    buildId: string
    buildLogs: IBuildLog[]
    buildStatus: string
    commitAuthorEmail: string | null
    commitAuthorName: string | null
    commitAuthoredAt: string | null
    commitBranch: string | null
    commitCommittedAt: string | null
    commitCommitterEmail: string | null
    commitCommitterName: string | null
    commitHash: string | null
    commitMessage: string | null
    completedAt: string | null
    createdAt: string
    errorMessage: string | null
    project: IProject
    queuedAt: string
    startedAt: string | null
}

export const buildFromApi = (payload: { [K: string]: any }, project?: IProject): IBuild => ({
    agentAddr: payload.agent_addr,
    buildId: payload.build_id,
    buildLogs: (payload.build_logs || []).map(buildLogFromApi),
    buildStatus: payload.build_status,
    commitAuthorEmail: payload.commit_author_email,
    commitAuthorName: payload.commit_author_name,
    commitAuthoredAt: payload.commit_authored_at,
    commitBranch: payload.commit_branch,
    commitCommittedAt: payload.commit_committed_at,
    commitCommitterEmail: payload.commit_committer_email,
    commitCommitterName: payload.commit_committer_name,
    commitHash: payload.commit_hash,
    commitMessage: payload.commit_message,
    completedAt: payload.completed_at,
    createdAt: payload.created_at,
    errorMessage: payload.error_message,
    project: project || projectFromApi(payload.project),
    queuedAt: payload.queued_at,
    startedAt: payload.started_at,
})
