import { Reducer } from 'redux'
import { ProjectActions } from '../actions'
import { IProject } from '../models'
import { neverReached } from './util'

export interface IProjectState {
    readonly project?: IProject
    readonly loading: boolean // TODO - rename to disambiguate
}

export const projectReducer: Reducer<IProjectState, ProjectActions> = (state = { loading: false }, action) => {
    switch (action.type) {
        case 'ClearProject': {
            return {
                ...state,
                project: undefined,
            }
        }

        case 'GettingProject':
        case 'CreatingProject':
        case 'UpdatingProject':
        case 'DeletingProject': {
            return {
                ...state,
                loading: true,
                project: undefined,
            }
        }

        case 'GotProject':
        case 'CreatedProject':
        case 'UpdatedProject': {
            return {
                ...state,
                loading: false,
                project: action.project,
            }
        }

        case 'DeletedProject': {
            return {
                ...state,
                loading: false,
                project: undefined,
            }
        }

        default:
            neverReached(action)
    }

    return state
}
