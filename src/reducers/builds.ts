import { Reducer } from 'redux'
import { BuildsActions } from '../actions'
import { IBuild } from '../models'
import { neverReached } from './util'

export interface IBuildsState {
    readonly builds: IBuild[]
    readonly loading: boolean // TODO - rename to disambiguate
}

export const buildsReducer: Reducer<IBuildsState, BuildsActions> = (state = { builds: [], loading: false }, action) => {
    switch (action.type) {
        case 'GettingBuilds': {
            return {
                ...state,
                builds: [],
                loading: true,
            }
        }

        case 'GotBuilds': {
            return {
                ...state,
                builds: action.builds,
                loading: false,
            }
        }

        default:
            neverReached(action)
    }

    return state
}
