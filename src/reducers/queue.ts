import { Reducer } from 'redux'
import { QueueActions } from '../actions'
import { IBuild } from '../models'
import { neverReached } from './util'

export interface IQueueState {
    readonly activeBuilds: IBuild[]
    readonly queuedBuilds: IBuild[]
    readonly loading: boolean // TODO - rename, one for each
}

export const queueReducer: Reducer<IQueueState, QueueActions> = (
    state = { activeBuilds: [], queuedBuilds: [], loading: false },
    action,
) => {
    switch (action.type) {
        case 'GettingActiveBuilds': {
            return {
                ...state,
                activeBuilds: [],
                loading: true,
            }
        }

        case 'GettingQueuedBuilds': {
            return {
                ...state,
                loading: true,
                queuedBuilds: [],
            }
        }

        case 'GotActiveBuilds': {
            return {
                ...state,
                activeBuilds: action.activeBuilds,
                loading: false,
            }
        }

        case 'GotQueuedBuilds': {
            return {
                ...state,
                loading: false,
                queuedBuilds: action.queuedBuilds,
            }
        }

        default:
            neverReached(action)
    }

    return state
}
