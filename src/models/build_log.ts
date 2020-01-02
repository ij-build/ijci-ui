export interface IBuildLog {
    buildLogId: string
    content: string
    createdAt: string
    name: string
    uploadedAt: string
}

export const buildLogFromApi = (payload: { [K: string]: any }): IBuildLog => ({
    buildLogId: payload.build_og_id,
    content: payload.content,
    createdAt: payload.created_at,
    name: payload.name,
    uploadedAt: payload.uploaded_at,
})
