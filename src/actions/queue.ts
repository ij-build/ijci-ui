import ky from 'ky'
import { Action, ActionCreator, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { buildFromApi, IBuild } from '../models'

export type QueueActions =
    | IGettingActiveBuildsAction
    | IGotActiveBuildsAction
    | IGettingQueuedBuildsAction
    | IGotQueuedBuildsAction

export interface IGettingActiveBuildsAction extends Action<'GettingActiveBuilds'> {}

export interface IGotActiveBuildsAction extends Action<'GotActiveBuilds'> {
    activeBuilds: IBuild[]
}

export interface IGettingQueuedBuildsAction extends Action<'GettingQueuedBuilds'> {}

export interface IGotQueuedBuildsAction extends Action<'GotQueuedBuilds'> {
    queuedBuilds: IBuild[]
}

export const getActiveBuildsActionCreator: ActionCreator<ThunkAction<
    Promise<IGotActiveBuildsAction>,
    IBuild[],
    null,
    IGotActiveBuildsAction
>> = () => {
    return async (dispatch: Dispatch) => {
        dispatch<IGettingActiveBuildsAction>({
            type: 'GettingActiveBuilds',
        })

        return dispatch<IGotActiveBuildsAction>({
            activeBuilds: await getActiveBuildsFromApi(),
            type: 'GotActiveBuilds',
        })
    }
}

export const getQueuedBuildsActionCreator: ActionCreator<ThunkAction<
    Promise<IGotQueuedBuildsAction>,
    IBuild[],
    null,
    IGotQueuedBuildsAction
>> = () => {
    return async (dispatch: Dispatch) => {
        dispatch<IGettingQueuedBuildsAction>({
            type: 'GettingQueuedBuilds',
        })

        return dispatch<IGotQueuedBuildsAction>({
            queuedBuilds: await getQueuedBuildsFromApi(),
            type: 'GotQueuedBuilds',
        })
    }
}

const getActiveBuildsFromApi = async (): Promise<IBuild[]> => {
    return ((await ky.get('builds/active', { prefixUrl: '/' }).json()) as {
        builds: IBuild[]
    }).builds.map(b => buildFromApi(b))
}

const getQueuedBuildsFromApi = async (): Promise<IBuild[]> => {
    return ((await ky.get('builds/queued', { prefixUrl: '/' }).json()) as {
        builds: IBuild[]
    }).builds.map(b => buildFromApi(b))
}
