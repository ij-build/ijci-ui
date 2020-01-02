import ky from 'ky'
import { Action, ActionCreator, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { IProject, projectFromApi } from '../models'

export type ProjectActions =
    | IGettingProjectAction
    | IGotProjectAction
    | ICreatingProjectAction
    | ICreatedProjectAction
    | IUpdatingProjectAction
    | IUpdatedProjectAction
    | IDeletingProjectAction
    | IDeletedProjectAction
    | IClearProjectAction

export interface IGettingProjectAction extends Action<'GettingProject'> {}

export interface IGotProjectAction extends Action<'GotProject'> {
    project: IProject
}

export interface ICreatingProjectAction extends Action<'CreatingProject'> {}

export interface ICreatedProjectAction extends Action<'CreatedProject'> {
    project: IProject
}

export interface IUpdatingProjectAction extends Action<'UpdatingProject'> {}

export interface IUpdatedProjectAction extends Action<'UpdatedProject'> {
    project: IProject
}

export interface IDeletingProjectAction extends Action<'DeletingProject'> {}

export interface IDeletedProjectAction extends Action<'DeletedProject'> {}

export interface IClearProjectAction extends Action<'ClearProject'> {}

export const getProjectActionCreator: ActionCreator<ThunkAction<
    Promise<IGotProjectAction>,
    IProject[],
    null,
    IGotProjectAction
>> = (id: string) => {
    return async (dispatch: Dispatch) => {
        dispatch<IGettingProjectAction>({
            type: 'GettingProject',
        })

        return dispatch<IGotProjectAction>({
            project: await getProjectFromApi(id),
            type: 'GotProject',
        })
    }
}

export const createProjectActionCreator: ActionCreator<ThunkAction<
    Promise<ICreatedProjectAction>,
    IProject[],
    null,
    ICreatedProjectAction
>> = (name: string, repositoryUrl: string) => {
    return async (dispatch: Dispatch) => {
        dispatch<ICreatingProjectAction>({
            type: 'CreatingProject',
        })

        return dispatch<ICreatedProjectAction>({
            project: await createProjectFromApi(name, repositoryUrl),
            type: 'CreatedProject',
        })
    }
}

export const updateProjectActionCreator: ActionCreator<ThunkAction<
    Promise<IUpdatedProjectAction>,
    IProject[],
    null,
    IUpdatedProjectAction
>> = (projectId: string, name: string, repositoryUrl: string) => {
    return async (dispatch: Dispatch) => {
        dispatch<IUpdatingProjectAction>({
            type: 'UpdatingProject',
        })

        return dispatch<IUpdatedProjectAction>({
            project: await updateProjectFromApi(projectId, name, repositoryUrl),
            type: 'UpdatedProject',
        })
    }
}

export const deleteProjectActionCreator: ActionCreator<ThunkAction<
    Promise<IDeletedProjectAction>,
    IProject[],
    null,
    IDeletedProjectAction
>> = (id: string) => {
    return async (dispatch: Dispatch) => {
        dispatch<IDeletingProjectAction>({
            type: 'DeletingProject',
        })

        await deleteProjectFromApi(id)

        return dispatch<IDeletedProjectAction>({
            type: 'DeletedProject',
        })
    }
}

const getProjectFromApi = async (id: string): Promise<IProject> => {
    return projectFromApi(((await ky.get(`projects/${id}`, { prefixUrl: '/' }).json()) as { project: any }).project)
}

const createProjectFromApi = async (name: string, repositoryUrl: string): Promise<IProject> => {
    const json = {
        name,
        repository_url: repositoryUrl,
    }

    return projectFromApi(((await ky.post(`projects`, { prefixUrl: '/', json }).json()) as { project: any }).project)
}

const updateProjectFromApi = async (projectId: string, name: string, repositoryUrl: string): Promise<IProject> => {
    const json = {
        name,
        repository_url: repositoryUrl,
    }

    return projectFromApi(
        ((await ky.patch(`projects/${projectId}`, { prefixUrl: '/', json }).json()) as {
            project: any
        }).project,
    )
}

const deleteProjectFromApi = async (id: string): Promise<void> => {
    await ky.delete(`projects/${id}`, { prefixUrl: '/' })
}
