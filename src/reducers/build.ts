import { Reducer } from 'redux'
import { BuildActions } from '../actions'
import { IBuild } from '../models'
import { neverReached } from './util'

export interface IBuildState {
    readonly build?: IBuild
    readonly loading: boolean // TODO - rename to disambiguate
}

export const buildReducer: Reducer<IBuildState, BuildActions> = (state = { loading: false }, action) => {
    switch (action.type) {
        case 'GettingBuild':
        case 'QueueingBuild':
        case 'CancellingBuild':
        case 'DeletingBuild': {
            return {
                ...state,
                build: undefined,
                loading: true,
            }
        }

        case 'GotBuild':
        case 'QueuedBuild': {
            return {
                ...state,
                build: action.build,
                loading: false,
            }
        }

        case 'CanceledBuild':
        case 'DeletedBuild': {
            return { ...state, build: undefined, loading: false }
        }

        default:
            neverReached(action)
    }

    return state
}
