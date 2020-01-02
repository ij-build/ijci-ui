import React, { FC, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { getBuildsActionCreator } from '../actions'
import { IBuild } from '../models'
import { IAppState } from '../reducers'

type IStateProps = ReturnType<typeof mapStateToProps>
type IDispatchProps = ReturnType<typeof mapDispatchToProps>
type IProps = IStateProps & IDispatchProps

export const BuildsTable: FC<{ builds: IBuild[] }> = props => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Status</th>
                    <th>Build</th>
                    <th>Commit</th>
                    <th>Last Activity</th>
                </tr>
            </thead>
            <tbody>
                {props.builds.map(build => (
                    <tr key={build.buildId}>
                        <td>
                            {build.buildStatus === 'succeeded'
                                ? 'yay'
                                : build.buildStatus === 'failed'
                                ? 'nay1'
                                : build.buildStatus === 'errored'
                                ? 'nay2'
                                : build.buildStatus === 'canceled'
                                ? 'canceled'
                                : ''}
                        </td>

                        <td>
                            <Link to={`/projects/${build.project.projectId}`}>{build.project.name}</Link> /
                            <Link to={`/builds/${build.buildId}`}>{build.buildId.substring(0, 7)}</Link>
                        </td>

                        <td>
                            {build.commitHash && build.commitMessage && (
                                <span>
                                    {build.commitHash.substring(0, 7)}: {build.commitMessage}
                                </span>
                            )}
                        </td>

                        <td>{build.completedAt || build.startedAt || build.createdAt}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

const BuildsImpl = ({ getBuilds, builds, loading }: IProps) => {
    useEffect(() => {
        getBuilds()
    }, [getBuilds])

    return (
        <div>
            <h2>Builds</h2>

            <Link to="/builds/new">New Build</Link>

            {loading ? 'LOADING' : <BuildsTable builds={builds} />}
        </div>
    )
}

const mapStateToProps = (appState: IAppState) => ({ ...appState.buildsState })

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
    getBuilds: () => dispatch(getBuildsActionCreator()),
})

export const Builds = connect(mapStateToProps, mapDispatchToProps)(BuildsImpl)
