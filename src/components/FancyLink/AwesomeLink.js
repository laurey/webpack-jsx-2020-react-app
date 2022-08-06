import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import styles from './styles.less';

function AwesomeLink({ label, name, to, title, target, children, className, activeOnlyWhenExact }) {
    const match = useRouteMatch({
        path: to,
        exact: activeOnlyWhenExact
    });

    return (
        <div className={match ? styles.active : ''}>
            {match && '> '}
            <Link to={to} target={target} className={className} title={title}>
                {label || name || children}
            </Link>
        </div>
    );
}

export default AwesomeLink;
