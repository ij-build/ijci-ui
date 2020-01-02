import React, { FC, useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import {
    cancelBuildActionCreator,
    deleteBuildActionCreator,
    getBuildActionCreator,
    requeueBuildActionCreator,
} from '../actions'
import { IBuildLog } from '../models'
import { IAppState } from '../reducers'

type IStateProps = ReturnType<typeof mapStateToProps>
type IDispatchProps = ReturnType<typeof mapDispatchToProps>
type IProps = IStateProps & IDispatchProps

const BuildLog: FC<{ buildLog: IBuildLog }> = props => {
    return (
        <div>
            {props.buildLog.name}
            {props.buildLog.content ? <pre>{props.buildLog.content}</pre> : '(no content)'}
        </div>
    )
}

const BuildImpl = ({ cancelBuild, deleteBuild, build, getBuild, loading, requeueBuild }: IProps) => {
    const { buildId } = useParams()

    useEffect(() => {
        getBuild(buildId!)
    }, [getBuild, buildId])

    // TODO - rename
    const requeue = async () => {
        if (build) {
            await requeueBuild(build.buildId)
        }
    }

    // TODO - rename
    const cancel = async () => {
        if (build) {
            await cancelBuild(build.buildId)
        }
    }

    // TODO - rename
    const del = async () => {
        if (build) {
            await deleteBuild(build.buildId)
        }
    }

    return (
        <div>
            {loading
                ? 'LOADING'
                : build && (
                      <>
                          <h2>
                              Build {build.buildId.substring(0, 7)} of {build.project.name}
                          </h2>

                          <button onClick={requeue}>Reueue</button>
                          <button onClick={cancel}>Cancel</button>
                          <button onClick={del}>Delete</button>

                          <div>Queued {build.createdAt}</div>

                          {build.queuedAt !== build.createdAt && <div>Requeued {build.queuedAt && build.queuedAt}</div>}

                          {build.startedAt && build.buildStatus !== 'canceled' && (
                              <div>In Progress {build.createdAt}</div>
                          )}

                          {build.completedAt &&
                              (build.buildStatus === 'succeeded' ? (
                                  <div>Completed {build.completedAt}</div>
                              ) : build.buildStatus === 'failed' ? (
                                  <div>Failed {build.completedAt}</div>
                              ) : build.buildStatus === 'errored' ? (
                                  <div>Errored {build.completedAt}</div>
                              ) : build.buildStatus === 'canceled' ? (
                                  <div>Canceled {build.completedAt}</div>
                              ) : (
                                  <div>Unknown {build.completedAt}</div>
                              ))}

                          {build.errorMessage && <p>{build.errorMessage}</p>}

                          {build.commitHash &&
                              build.commitBranch &&
                              build.commitMessage &&
                              build.commitAuthorName &&
                              build.commitAuthorEmail &&
                              build.commitAuthoredAt && (
                                  <div>
                                      <span>
                                          {build.commitHash.substring(0, 7)} on {build.commitBranch}
                                      </span>

                                      <span>{build.commitMessage}</span>
                                      <span>{build.commitAuthorName}</span>
                                      <span>{build.commitAuthorEmail}</span>
                                      <span>Authored on {build.commitAuthoredAt}</span>
                                      <span>Committed on {build.commitCommittedAt}</span>
                                  </div>
                              )}

                          {build.buildLogs.map(buildLog => (
                              <BuildLog key={buildLog.buildLogId} buildLog={buildLog} />
                          ))}
                      </>
                  )}
        </div>
    )
}

const mapStateToProps = (appState: IAppState) => ({ ...appState.buildState })

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
    cancelBuild: (id: string) => dispatch(cancelBuildActionCreator(id)),
    deleteBuild: (id: string) => dispatch(deleteBuildActionCreator(id)),
    getBuild: (id: string) => dispatch(getBuildActionCreator(id)),
    requeueBuild: (id: string) => dispatch(requeueBuildActionCreator(id)),
})

export const Build = connect(mapStateToProps, mapDispatchToProps)(BuildImpl)
