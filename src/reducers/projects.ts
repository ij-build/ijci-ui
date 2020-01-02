import { Reducer } from 'redux'
import { ProjectsActions } from '../actions'
import { IProject } from '../models'
import { neverReached } from './util'

export interface IProjectsState {
    readonly projects: IProject[]
    readonly loading: boolean // TODO - rename to disambiguate
}

export const projectsReducer: Reducer<IProjectsState, ProjectsActions> = (
    state = { projects: [], loading: false },
    action,
) => {
    switch (action.type) {
        case 'GettingProjects': {
            return {
                ...state,
                loading: true,
                projects: [],
            }
        }

        case 'GotProjects': {
            return {
                ...state,
                loading: false,
                projects: action.projects,
            }
        }

        default:
            neverReached(action)
    }

    return state
}
