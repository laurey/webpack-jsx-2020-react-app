import React from 'react';
import { Link } from 'react-router-dom';
import AwesomeLink from './AwesomeLink';
import AnchorLink from './AnchorLink';
import ButtonLink from './ButtonLink';
import { isUrl } from '../../utils/utils';
import styles from './styles.less';

function FancyLink({ label, name, title, children, to, activeOnlyWhenExact, ...props }) {
    if (isUrl(to)) {
        return (
            <AwesomeLink
                {...props}
                name={name}
                label={label}
                title={title}
                activeOnlyWhenExact={activeOnlyWhenExact}
                className={`${styles.basic} ${styles.external}`}
                to={{
                    pathname: '/redirect',
                    search: '?link=' + encodeURIComponent(to)
                }}
            >
                {children}
            </AwesomeLink>
        );
    }

    return (
        <Link className={styles.basic} to={to} title={title} {...props}>
            {label || name || children}
        </Link>
    );
}

FancyLink.AwesomeLink = AwesomeLink;
FancyLink.AnchorLink = AnchorLink;
FancyLink.ButtonLink = ButtonLink;

export { FancyLink as default, AwesomeLink, AnchorLink, ButtonLink };
