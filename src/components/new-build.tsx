import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { queueBuildActionCreator } from '../actions'
import { IAppState } from '../reducers'

type IStateProps = ReturnType<typeof mapStateToProps>
type IDispatchProps = ReturnType<typeof mapDispatchToProps>
type IProps = IStateProps & IDispatchProps

interface IFormData {
    projectId: string
    repositoryUrl: string
    commitBranch?: string
    commitHash?: string
}

type IFormErrors = {
    [k in keyof IFormData]?: string
}

const NewBuildImpl = ({ queueBuild, build }: IProps) => {
    const [state, setState] = useState({ build })

    const validate = (values: IFormData): IFormErrors => {
        const errors: IFormErrors = {}
        if (!values.projectId) {
            errors.projectId = 'Required'
        }

        if (!values.repositoryUrl) {
            errors.repositoryUrl = 'Required'
        }

        return errors
    }

    const createBuild = async (values: IFormData) => {
        const action = await queueBuild(values)
        setState({ build: action.build })
    }

    return (
        <div>
            <h2>New Build</h2>

            <Formik initialValues={{ projectId: '', repositoryUrl: '' }} validate={validate} onSubmit={createBuild}>
                <Form>
                    Project Id:
                    <Field type="text" name="projectId" />
                    <ErrorMessage name="projectId" component="div" />
                    Repository Url:
                    <Field type="text" name="repositoryUrl" />
                    <ErrorMessage name="repositoryUrl" component="div" />
                    Commit Branch:
                    <Field type="text" name="commitBranch" />
                    <ErrorMessage name="commitBranch" component="div" />
                    Commit Hash:
                    <Field type="text" name="commitHash" />
                    <ErrorMessage name="commitHash" component="div" />
                    <button type="submit">Submit</button>
                </Form>
            </Formik>

            {state.build && (
                <Redirect
                    to={{
                        pathname: `/builds/${state.build.buildId}`,
                        state: { build: state.build },
                    }}
                />
            )}
        </div>
    )
}

const mapStateToProps = (appState: IAppState) => ({ ...appState.buildState })

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
    queueBuild: (values: IFormData) =>
        dispatch(
            queueBuildActionCreator(values.projectId, values.repositoryUrl, values.commitBranch, values.commitHash),
        ),
})

export const NewBuild = withRouter(connect(mapStateToProps, mapDispatchToProps)(NewBuildImpl))
