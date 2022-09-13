import React from 'react';

const joinChildren = (children, separator) => {
    const childrenArray = React.Children.toArray(children).filter(Boolean);

    return childrenArray.reduce((output, child, index) => {
        output.push(child);

        if (index < childrenArray.length - 1) {
            output.push(React.cloneElement(separator, { key: `separator-${index}` }));
        }

        return output;
    }, []);
};

const getSideFromDirection = direction => {
    return {
        row: 'Left',
        'row-reverse': 'Right',
        column: 'Top',
        'column-reverse': 'Bottom'
    }[direction];
};

const getStyles = ({ ownerState, id, justifyContent, alignItems, styles: stylesInProps }) => {
    let styles = {
        display: 'flex',
        flexDirection: ownerState?.direction ?? 'column',
        justifyContent,
        alignItems
    };

    let element;

    if (ownerState.spacing) {
        const style = `
        #${id}.${stylesInProps.stack}>:not(style)+:not(style) {
            margin: 0;
            margin-${getSideFromDirection(ownerState.direction).toLowerCase()}: ${ownerState.spacing}px;
        }
        `;
        element = <style>{style}</style>;
    }

    return { styles, element };
};

export { joinChildren, getStyles, getSideFromDirection };
