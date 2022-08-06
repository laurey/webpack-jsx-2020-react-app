import React from 'react';
// import BasicLayout from "./layouts/BasicLayout";
import { BasicLayoutProvider } from './contexts/useBasicLayoutContext';
import { AuthProvider } from './contexts/useAuthContext';
import './App.css';

function App(props) {
    return (
        <BasicLayoutProvider>
            <AuthProvider>{props.children}</AuthProvider>
        </BasicLayoutProvider>
    );
}

export default App;
