import React, { useContext } from 'react';
import useBasicLayout from '@/hooks/useBasicLayout';

const BasicLayoutContext = React.createContext();

export function BasicLayoutProvider(props) {
    const { children } = props;
    const { layout, updateBasicLayout } = useBasicLayout();
    const value = {
        currentLayout: layout,
        update: updateBasicLayout
    };

    let child;
    if (typeof children === 'function') {
        child = children(props);
    } else if (React.isValidElement(children)) {
        child = children;
    }

    return <BasicLayoutContext.Provider value={value}>{child}</BasicLayoutContext.Provider>;
}

function useBasicLayoutContext() {
    const context = useContext(BasicLayoutContext);
    if (context === undefined) {
        throw new Error('useBasicLayoutContext should be used with BasicLayoutProvider');
    }
    return context;
}

export default useBasicLayoutContext;
