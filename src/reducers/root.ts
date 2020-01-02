import { combineReducers } from 'redux'
import { buildReducer } from './build'
import { buildsReducer } from './builds'
import { projectReducer } from './project'
import { projectsReducer } from './projects'
import { queueReducer } from './queue'

export type IAppState = ReturnType<typeof rootReducer>

export const rootReducer = combineReducers({
    buildState: buildReducer,
    buildsState: buildsReducer,
    projectState: projectReducer,
    projectsState: projectsReducer,
    queueState: queueReducer,
})
