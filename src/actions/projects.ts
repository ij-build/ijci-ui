import ky from 'ky'
import { Action, ActionCreator, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { IProject, projectFromApi } from '../models'

export type ProjectsActions = IGettingProjectsAction | IGotProjectsAction

export interface IGettingProjectsAction extends Action<'GettingProjects'> {}

export interface IGotProjectsAction extends Action<'GotProjects'> {
    projects: IProject[]
}

export const getProjectsActionCreator: ActionCreator<ThunkAction<
    Promise<IGotProjectsAction>,
    IProject[],
    null,
    IGotProjectsAction
>> = () => {
    return async (dispatch: Dispatch) => {
        dispatch<IGettingProjectsAction>({
            type: 'GettingProjects',
        })

        return dispatch<IGotProjectsAction>({
            projects: await getProjectsFromApi(),
            type: 'GotProjects',
        })
    }
}

const getProjectsFromApi = async (): Promise<IProject[]> => {
    return ((await ky.get('projects', { prefixUrl: '/' }).json()) as {
        projects: IProject[]
    }).projects.map(projectFromApi)
}
