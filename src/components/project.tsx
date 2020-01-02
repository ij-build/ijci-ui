import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import {
    deleteProjectActionCreator,
    getBuildsForProjectActionCreator,
    getProjectActionCreator,
    queueBuildActionCreator,
} from '../actions'
import { IProject } from '../models'
import { IAppState } from '../reducers'
import { BuildsTable } from './builds'

type IStateProps = ReturnType<typeof mapStateToProps>
type IDispatchProps = ReturnType<typeof mapDispatchToProps>
type IProps = IStateProps & IDispatchProps

const ProjectImpl = ({
    builds,
    getBuildsForProject,
    getProject,
    deleteProject,
    queueBuild,
    project,
    loading,
}: IProps) => {
    const { projectId } = useParams()

    useEffect(() => {
        getProject(projectId!)
    }, [getProject, projectId])

    useEffect(() => {
        if (project) {
            getBuildsForProject(project)
        }
    }, [getBuildsForProject, project])

    // TODO - rename
    const queue = () => {
        if (project) {
            queueBuild(project.projectId, project.repositoryUrl)
            // TODO - need to navigate to build
        }
    }

    // TODO - rename
    const del = async () => {
        if (project) {
            await deleteProject(project.projectId)
            // TODO - need to navigate away somehow
        }
    }

    return (
        <div>
            {loading
                ? 'LOADING'
                : project && (
                      <>
                          <h2>Project {project.name}</h2>

                          <button onClick={queue}>Queue</button>
                          <Link to={`/projects/${project.projectId}/edit`}>Edit</Link>
                          <button onClick={del}>Delete</button>

                          <p>{project.repositoryUrl}</p>

                          <BuildsTable builds={builds} />
                      </>
                  )}
        </div>
    )
}

const mapStateToProps = (appState: IAppState) => ({ ...appState.projectState, ...appState.buildsState })

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
    deleteProject: (id: string) => dispatch(deleteProjectActionCreator(id)),
    getBuildsForProject: (project: IProject) => dispatch(getBuildsForProjectActionCreator(project)),
    getProject: (id: string) => dispatch(getProjectActionCreator(id)),
    queueBuild: (id: string, repositoryUrl: string) => dispatch(queueBuildActionCreator(id, repositoryUrl)),
})

export const Project = connect(mapStateToProps, mapDispatchToProps)(ProjectImpl)
