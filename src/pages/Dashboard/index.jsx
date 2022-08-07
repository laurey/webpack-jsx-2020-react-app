import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import FancyLink from '@/components/FancyLink';
// import findRoute from '@/config/findRoute';

class DashBoard extends Component {
    render() {
        const { match, route, location } = this.props;
        return (
            <div>
                <h2>DashBoard</h2>
                <span>{this.props.lazy ? 'load lazy' : ''}</span>
                <ul>
                    <li>
                        <FancyLink title="analysis" to={`${match.url}/analysis`}>
                            Dash Analysis
                        </FancyLink>
                    </li>
                    <li>
                        <Link title="Monitor" to={`${match.url}/monitor`}>
                            Dash Monitor(no matched path)
                        </Link>
                    </li>
                    <li>
                        <FancyLink
                            to={{
                                pathname: `${match.url}/center`
                            }}
                        >
                            Dash Center
                        </FancyLink>
                    </li>
                </ul>
                {this.props.children}
                {/* <Switch>
                    <Route
                        path={`${match.path}/:topicId`}
                        render={props => {
                            const child = findRoute(route.routes, props.location.pathname);
                            const Component = child?.component;
                            return (
                                <div>
                                    <p>children route of {match.url}</p>
                                    <p>current url: {props.match.url}</p>
                                    {Component ? <Component {...props} /> : <strong>No matched route!!!</strong>}
                                </div>
                            );
                        }}
                    />
                    <Route exact path={match.path}>
                        <h3>Please select a topic.</h3>
                        <pre>{JSON.stringify(match, null, '')}</pre>
                    </Route>
                </Switch> */}
            </div>
        );
    }
}

export default DashBoard;
