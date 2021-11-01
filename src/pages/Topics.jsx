import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route, Switch } from 'react-router-dom';

import styles from './Topics.less';

export class Topic extends React.PureComponent {
    render() {
        const { topicId } = this.props.match.params;

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
}

class Topics extends React.Component {
    render() {
        const { path, url } = this.props.match;

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
                    <Route path={`${path}/:topicId`} component={Topic} />
                </Switch>
            </div>
        );
    }
}

Topics.propTypes = {
    topics: PropTypes.array
};

export default Topics;
