import React from 'react';

export default function Exception({ type, children, ...rest }) {
    return (
        <div {...rest}>
            <h2>Type: {type} </h2>
            <div>From Exception Component Message</div>
            {children}
        </div>
    );
}
