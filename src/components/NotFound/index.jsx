import React from 'react';

import guessFileFromPath from './guessFileFromPath';
import styles from './style.modules.less';

const NotFound = props => {
    const { location, history, pagesPath } = props;
    const jsFile = guessFileFromPath(location?.pathname || history.location.pathname);
    return (
        <div className={styles['global-NotFound-wrapper']}>
            <h1>Warning</h1>
            <p>
                The page <code>{location?.pathname || history.location.pathname}</code> doesn&apos;t exist.
            </p>
            <p>
                Create a React component in your pages directory, such as
                <code>
                    {pagesPath}/{jsFile}
                </code>
                , then refresh browser to show the new content.
            </p>
        </div>
    );
};

export default NotFound;
