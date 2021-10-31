import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Route, Switch, useRouteMatch, useParams } from 'react-router';

import styles from './Topics.css';

function Topic() {
    const { topicId } = useParams();

    return (
        <div className={styles.topicContainer}>
            <h3>{topicId}</h3>
            <div className={styles.topicBody}>
                <main>This is Topic Body-Content</main>
                <a href="/">Go Home</a>
            </div>
            <pre>
                {`{
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint && npm run format"
    }
  }
}`}
            </pre>
        </div>
    );
}

function Topics() {
    const { path, url } = useRouteMatch();

    return (
        <div>
            <h2>Topics</h2>
            <ul>
                <li>
                    <Link to={`${url}/rendering`}>Rendering with React</Link>
                </li>
                <li>
                    <Link to={`${url}/components`}>Components</Link>
                </li>
                <li>
                    <Link to={`${url}/props-v-state`}>Props v. State</Link>
                </li>
            </ul>

            <Switch>
                <Route exact path={path}>
                    <h3>Please select a topic.</h3>
                </Route>
                <Route path={`${path}/:topicId`}>
                    <Topic />
                </Route>
            </Switch>
        </div>
    );
}

Topics.propTypes = {
    topics: PropTypes.array
};

export default Topics;
