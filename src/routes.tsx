import React from 'react'
import { RouteConfig } from 'react-router-config'
import { Build } from './components/build'
import { Builds } from './components/builds'
import { Home } from './components/home'
import { NewBuild } from './components/new-build'
import { NewProject } from './components/new-project'
import { NoMatch } from './components/nomatch'
import { Project } from './components/project'
import { Projects } from './components/projects'
import { Queue } from './components/queue'

export const routes: readonly RouteConfig[] = [
    {
        exact: true,
        path: '/',
        render: () => <Home />,
    },
    {
        path: '/projects/new',
        render: () => <NewProject />,
    },
    {
        path: '/projects/:projectId/edit',
        render: () => <NewProject />,
    },
    {
        path: '/projects/:projectId',
        render: () => <Project />,
    },
    {
        path: '/projects',
        render: () => <Projects />,
    },
    {
        path: '/builds/new',
        render: () => <NewBuild />,
    },
    {
        path: '/builds/:buildId',
        render: () => <Build />,
    },
    {
        path: '/builds',
        render: () => <Builds />,
    },
    {
        path: '/queue',
        render: () => <Queue />,
    },
    {
        path: '*',
        render: () => <NoMatch />,
    },
]
