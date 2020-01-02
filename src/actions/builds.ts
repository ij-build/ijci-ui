import ky from 'ky'
import { Action, ActionCreator, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { buildFromApi, IBuild, IProject } from '../models'

export type BuildsActions = IGettingBuildsAction | IGotBuildsAction

export interface IGettingBuildsAction extends Action<'GettingBuilds'> {}

export interface IGotBuildsAction extends Action<'GotBuilds'> {
    builds: IBuild[]
}

export const getBuildsActionCreator: ActionCreator<ThunkAction<
    Promise<IGotBuildsAction>,
    IBuild[],
    null,
    IGotBuildsAction
>> = () => {
    return async (dispatch: Dispatch) => {
        dispatch<IGettingBuildsAction>({
            type: 'GettingBuilds',
        })

        return dispatch<IGotBuildsAction>({
            builds: await getBuildsFromApi(),
            type: 'GotBuilds',
        })
    }
}

// TODO - collapse into above?
export const getBuildsForProjectActionCreator: ActionCreator<ThunkAction<
    Promise<IGotBuildsAction>,
    IBuild[],
    null,
    IGotBuildsAction
>> = (project: IProject) => {
    return async (dispatch: Dispatch) => {
        dispatch<IGettingBuildsAction>({
            type: 'GettingBuilds',
        })

        return dispatch<IGotBuildsAction>({
            builds: await getBuildsForProjectFromApi(project),
            type: 'GotBuilds',
        })
    }
}

const getBuildsFromApi = async (): Promise<IBuild[]> => {
    return ((await ky.get('builds', { prefixUrl: '/' }).json()) as {
        builds: IBuild[]
    }).builds.map(b => buildFromApi(b))
}

const getBuildsForProjectFromApi = async (project: IProject): Promise<IBuild[]> => {
    return ((await ky.get(`projects/${project.projectId}/builds`, { prefixUrl: '/' }).json()) as {
        builds: IBuild[]
    }).builds.map(b => buildFromApi(b, project))
}
