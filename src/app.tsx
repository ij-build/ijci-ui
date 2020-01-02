import React from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import { routes } from './routes'

export const App = () => {
    return (
        <div>
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/projects">Projects</Link>
                            </li>
                            <li>
                                <Link to="/builds">Builds</Link>
                            </li>
                            <li>
                                <Link to="/queue">Queue</Link>
                            </li>
                        </ul>
                    </nav>

                    <Switch>
                        <Switch>
                            {routes.map((route, i) => (
                                <Route key={i} {...route} />
                            ))}
                        </Switch>
                    </Switch>
                </div>
            </Router>
        </div>
    )
}
