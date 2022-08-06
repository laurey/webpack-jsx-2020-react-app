import React from 'react';
import { withRouter } from 'react-router-dom';

import guessFileFromPath from './guessFileFromPath';
import styles from './style.modules.less';

const NotFound = props => {
    const { location, pagesPath } = props;
    const jsFile = guessFileFromPath(location.pathname);
    return (
        <div className={styles['global-NotFound-wrapper']}>
            <h1>development 404 page</h1>
            <p>
                There&apos;s not a page yet at <code>{location.pathname}</code>.
            </p>
            <p>
                Create a React component in your pages directory at
                <code>
                    {pagesPath}/{jsFile}
                </code>
                then this page will automatically refresh to show the new content.
            </p>
        </div>
    );
};

export default withRouter(NotFound);
