import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Redirect, useParams, withRouter } from 'react-router-dom'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { createProjectActionCreator, getProjectActionCreator, updateProjectActionCreator } from '../actions'
import { IAppState } from '../reducers'

type IStateProps = ReturnType<typeof mapStateToProps>
type IDispatchProps = ReturnType<typeof mapDispatchToProps>
type IProps = IStateProps & IDispatchProps

interface IFormData {
    name: string
    repositoryUrl: string
}

type IFormErrors = {
    [k in keyof IFormData]?: string
}

const NewProjectImpl = ({ createProject, getProject, updateProject, project }: IProps) => {
    const { projectId } = useParams()

    useEffect(() => {
        if (projectId) {
            getProject(projectId)
        }
    }, [getProject, projectId])

    const [state, setState] = useState({ project })

    const validate = (values: IFormData): IFormErrors => {
        const errors: IFormErrors = {}
        if (!values.name) {
            errors.name = 'Required'
        }

        if (!values.repositoryUrl) {
            errors.repositoryUrl = 'Required'
        }

        return errors
    }

    const submit = async (values: IFormData) => {
        if (state.project) {
            const action = await updateProject(state.project.projectId, values)
            setState({ project: action.project })
            // TODO - trigger redirect here as well?
        } else {
            const action = await createProject(values)
            setState({ project: action.project })
            // TODO - trigger redirect here
        }
    }

    return (
        <div>
            <h2>New Project</h2>

            <span>
                {state.project && state.project.projectId}
                ???
            </span>

            <Formik initialValues={{ name: '', repositoryUrl: '' }} validate={validate} onSubmit={submit}>
                <Form>
                    Name:
                    <Field type="text" name="name" />
                    <ErrorMessage name="name" component="div" />
                    Repository Url:
                    <Field type="text" name="repositoryUrl" />
                    <ErrorMessage name="repositoryUrl" component="div" />
                    <button type="submit">Submit</button>
                </Form>
            </Formik>

            {/* TODO */}

            {/* {state.project && (
                <Redirect
                    to={{
                        pathname: `/projects/${state.project.projectId}`,
                        state: { project: state.project },
                    }}
                />
            )} */}
        </div>
    )
}

const mapStateToProps = (appState: IAppState) => ({ ...appState.projectState })

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
    createProject: (values: IFormData) => dispatch(createProjectActionCreator(values.name, values.repositoryUrl)),
    getProject: (id: string) => dispatch(getProjectActionCreator(id)),
    updateProject: (projectId: string, values: IFormData) =>
        dispatch(updateProjectActionCreator(projectId, values.name, values.repositoryUrl)),
})

export const NewProject = withRouter(connect(mapStateToProps, mapDispatchToProps)(NewProjectImpl))
