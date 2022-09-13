import React, { forwardRef } from 'react';
import Item from './Item';
import { joinChildren, getStyles } from './utils';
import styles from './style.less';

function Stack(props, ref) {
    const { direction = 'column', divider, spacing, children, justifyContent, alignItems, style, ...other } = props;
    const ownerState = {
        direction,
        spacing
    };

    const id = `id-of-stack-${`${new Date().getTime()}${Math.floor(Math.random() * 100)}`}`;
    const styleProps = getStyles({ ownerState, styles, justifyContent, alignItems, ...other, id });

    return (
        <div id={id} className={styles['stack']} ref={ref} style={{ ...styleProps.styles, ...style }} {...other}>
            {styleProps.element}
            {divider ? joinChildren(children, divider) : children}
        </div>
    );
}

const ForwardedStack = forwardRef(Stack);
ForwardedStack.displayName = 'Stack';
ForwardedStack.Item = Item;

export default ForwardedStack;
