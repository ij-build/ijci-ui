export interface IProject {
    lastBuildCompletedAt: string | null
    lastBuildId: string | null
    lastBuildStatus: string | null
    name: string
    projectId: string
    repositoryUrl: string
}

export const projectFromApi = (payload: { [K: string]: any }): IProject => ({
    lastBuildCompletedAt: payload.last_build_completed_at,
    lastBuildId: payload.last_build_id,
    lastBuildStatus: payload.last_build_status,
    name: payload.name,
    projectId: payload.project_id,
    repositoryUrl: payload.repository_url,
})
