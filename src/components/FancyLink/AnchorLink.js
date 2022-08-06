import React from 'react';

const AnchorLink = ({ name, title, label, children, href, ...props }) => {
    return (
        <a {...props} href={href} title={title}>
            <span aria-label="foods-drink-foo" role="img">
                🍖🍺🏆✈️⚽️🈵️
            </span>
            {label || name || children}
        </a>
    );
};

export default AnchorLink;
