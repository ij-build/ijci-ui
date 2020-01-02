import ky from 'ky'
import { identity, pickBy } from 'lodash'
import { Action, ActionCreator, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { buildFromApi, IBuild } from '../models'

export type BuildActions =
    | IGettingBuildAction
    | IGotBuildAction
    | IQueueingBuildAction
    | IQueuedBuildAction
    | ICancellingBuildAction
    | ICanceledBuildAction
    | IDeletingBuildAction
    | IDeletedBuildAction

export interface IGettingBuildAction extends Action<'GettingBuild'> {}

export interface IGotBuildAction extends Action<'GotBuild'> {
    build: IBuild
}

export interface IQueueingBuildAction extends Action<'QueueingBuild'> {}

export interface IQueuedBuildAction extends Action<'QueuedBuild'> {
    build: IBuild
}

export interface ICancellingBuildAction extends Action<'CancellingBuild'> {}

export interface ICanceledBuildAction extends Action<'CanceledBuild'> {}

export interface IDeletingBuildAction extends Action<'DeletingBuild'> {}

export interface IDeletedBuildAction extends Action<'DeletedBuild'> {}

export const getBuildActionCreator: ActionCreator<ThunkAction<
    Promise<IGotBuildAction>,
    IBuild[],
    null,
    IGotBuildAction
>> = (id: string) => {
    return async (dispatch: Dispatch) => {
        dispatch<IGettingBuildAction>({
            type: 'GettingBuild',
        })

        return dispatch<IGotBuildAction>({
            build: await getBuildFromApi(id),
            type: 'GotBuild',
        })
    }
}

export const queueBuildActionCreator: ActionCreator<ThunkAction<
    Promise<IQueuedBuildAction>,
    IBuild[],
    null,
    IQueuedBuildAction
>> = (projectId: string, repositoryUrl: string, commitBranch?: string, commitHash?: string) => {
    return async (dispatch: Dispatch) => {
        dispatch<IQueueingBuildAction>({
            type: 'QueueingBuild',
        })

        return dispatch<IQueuedBuildAction>({
            build: await queueBuildFromApi(projectId, repositoryUrl, commitBranch, commitHash),
            type: 'QueuedBuild',
        })
    }
}

export const requeueBuildActionCreator: ActionCreator<ThunkAction<
    Promise<IQueuedBuildAction>,
    IBuild[],
    null,
    IQueuedBuildAction
>> = (id: string) => {
    return async (dispatch: Dispatch) => {
        dispatch<IQueueingBuildAction>({
            type: 'QueueingBuild',
        })

        return dispatch<IQueuedBuildAction>({
            build: await requeueBuildFromApi(id),
            type: 'QueuedBuild',
        })
    }
}

export const cancelBuildActionCreator: ActionCreator<ThunkAction<
    Promise<ICanceledBuildAction>,
    IBuild[],
    null,
    ICanceledBuildAction
>> = (id: string) => {
    return async (dispatch: Dispatch) => {
        dispatch<ICancellingBuildAction>({
            type: 'CancellingBuild',
        })

        await cancelBuildFromApi(id)

        return dispatch<ICanceledBuildAction>({
            type: 'CanceledBuild',
        })
    }
}

export const deleteBuildActionCreator: ActionCreator<ThunkAction<
    Promise<IDeletedBuildAction>,
    IBuild[],
    null,
    IDeletedBuildAction
>> = (id: string) => {
    return async (dispatch: Dispatch) => {
        dispatch<IDeletingBuildAction>({
            type: 'DeletingBuild',
        })

        await deleteBuildFromApi(id)

        return dispatch<IDeletedBuildAction>({
            type: 'DeletedBuild',
        })
    }
}

const getBuildFromApi = async (id: string): Promise<IBuild> => {
    return buildFromApi(((await ky.get(`builds/${id}`, { prefixUrl: '/' }).json()) as { build: any }).build)
}

const queueBuildFromApi = async (
    projectId: string,
    repositoryUrl: string,
    commitBranch?: string,
    commitHash?: string,
): Promise<IBuild> => {
    const json = {
        commit_branch: commitBranch,
        commit_hash: commitHash,
        project_id: projectId,
        repository_url: repositoryUrl,
    }

    return buildFromApi(
        ((await ky.post('builds', { prefixUrl: '/', json: pickBy(json, identity) }).json()) as { build: any }).build,
    )
}

const requeueBuildFromApi = async (id: string): Promise<IBuild> => {
    return buildFromApi(((await ky.post(`builds/${id}/requeue`, { prefixUrl: '/' }).json()) as { build: any }).build)
}

const cancelBuildFromApi = async (id: string): Promise<void> => {
    await ky.post(`builds/${id}/cancel`, { prefixUrl: '/' })
}

const deleteBuildFromApi = async (id: string): Promise<void> => {
    await ky.delete(`builds/${id}`, { prefixUrl: '/' })
}
