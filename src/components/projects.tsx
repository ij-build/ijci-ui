import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { getProjectsActionCreator, IClearProjectAction } from '../actions'
import { IAppState } from '../reducers'
import { store } from '../store'

type IStateProps = ReturnType<typeof mapStateToProps>
type IDispatchProps = ReturnType<typeof mapDispatchToProps>
type IProps = IStateProps & IDispatchProps

const ProjectsImpl = ({ getProjects, projects, loading }: IProps) => {
    useEffect(() => {
        getProjects()
    }, [getProjects])

    store.dispatch<IClearProjectAction>({
        type: 'ClearProject',
    })

    return (
        <div>
            <h2>Projects</h2>

            <Link to="/projects/new">New Project</Link>

            {loading ? (
                'LOADING'
            ) : (
                <div>
                    {projects.map(project => (
                        <div key={project.projectId}>
                            <div>
                                {project.lastBuildStatus === 'succeeded'
                                    ? ':)'
                                    : project.lastBuildStatus === 'failed'
                                    ? ':('
                                    : project.lastBuildStatus === 'errored'
                                    ? ':('
                                    : project.lastBuildStatus === 'canceled'
                                    ? 'canceled'
                                    : ''}
                            </div>
                            <Link to={`/projects/${project.projectId}`}>{project.name}</Link>

                            <div>
                                {project.lastBuildId && (
                                    <>
                                        <Link to={`/builds/${project.lastBuildId}`}>Last build</Link> completed at{' '}
                                        {project.lastBuildCompletedAt}
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

const mapStateToProps = (appState: IAppState) => ({ ...appState.projectsState })

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
    getProjects: () => dispatch(getProjectsActionCreator()),
})

export const Projects = connect(mapStateToProps, mapDispatchToProps)(ProjectsImpl)
