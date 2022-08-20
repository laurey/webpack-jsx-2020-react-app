// test-utils.js
import React from 'react';
import { Router } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { render as rtlRender } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import rootReducers from './reducers';

function renderWithRedux(ui, { initialState, store = createStore(rootReducers, initialState), ...renderOptions } = {}) {
    function Wrapper({ children }) {
        return <Provider store={store}>{children}</Provider>;
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

function renderWithRouter(ui, { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {}) {
    return {
        ...rtlRender(<Router history={history}>{ui}</Router>),
        // adding `history` to the returned utilities to allow us
        // to reference it in our tests (just try to avoid using
        // this to test implementation details).
        history
    };
}

function renderWithRouterRedux(
    ui,
    {
        initialState = {
            counter: {
                value: 1
            }
        },
        store = createStore(rootReducers, initialState),
        route = '/',
        history = createMemoryHistory({ initialEntries: [route] }),
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }) {
        return (
            <Provider store={store}>
                <Router history={history}>{children}</Router>
            </Provider>
        );
    }

    return {
        ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
        history
    };
}

// re-export everything
export * from 'history';
export * from '@testing-library/react';
// export * from '@testing-library/dom';
export { renderWithRedux, renderWithRouter, renderWithRouterRedux, userEvent };
