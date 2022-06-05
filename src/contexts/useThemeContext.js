import React, { useContext } from 'react';
import useTheme from '../hooks/useTheme';

const ThemeContext = React.createContext();

export function ThemeProvider(props) {
    const { children } = props;
    const { theme: currentTheme, updateTheme } = useTheme();
    const value = {
        currentTheme,
        update: param => {
            return updateTheme(param);
        }
    };
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

function useThemeContext() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useThemeContext should be used with ThemeProvider');
    }
    return context;
}

export default useThemeContext;
