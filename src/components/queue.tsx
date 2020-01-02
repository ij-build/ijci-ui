import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { getActiveBuildsActionCreator, getQueuedBuildsActionCreator } from '../actions'
import { IAppState } from '../reducers'
import { BuildsTable } from './builds'

type IStateProps = ReturnType<typeof mapStateToProps>
type IDispatchProps = ReturnType<typeof mapDispatchToProps>
type IProps = IStateProps & IDispatchProps

const QueueImpl = ({ getActiveBuilds, getQueuedBuilds, activeBuilds, queuedBuilds, loading }: IProps) => {
    useEffect(() => {
        getActiveBuilds()
    }, [getActiveBuilds])

    useEffect(() => {
        getQueuedBuilds()
    }, [getQueuedBuilds])

    return (
        <div>
            <h2>Queue</h2>

            {loading ? (
                'LOADING'
            ) : (
                <div>
                    <h2>Active</h2>
                    <BuildsTable builds={activeBuilds} />

                    <h2>Queued</h2>
                    <BuildsTable builds={queuedBuilds} />
                </div>
            )}
        </div>
    )
}

const mapStateToProps = (appState: IAppState) => ({ ...appState.queueState })

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
    getActiveBuilds: () => dispatch(getActiveBuildsActionCreator()),
    getQueuedBuilds: () => dispatch(getQueuedBuildsActionCreator()),
})

export const Queue = connect(mapStateToProps, mapDispatchToProps)(QueueImpl)
