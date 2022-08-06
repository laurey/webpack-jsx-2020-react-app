import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import findRoute from './config/findRoute';
import RouterWrapper from './config/RouterWrapper';
import routes from './config/router.config';
import store from './store';
import App from './App';

import 'antd/dist/antd.css';
import './index.css';

const rootElement = document.getElementById('root');

async function render(Component) {
    window.g_isBrowser = true;
    let props = {};
    const pathname = window.location.pathname;
    const activeRoute = findRoute(routes, pathname);
    if (activeRoute && activeRoute.component && activeRoute.component.getInitialProps) {
        props = activeRoute.component.getInitialProps
            ? await activeRoute.component.getInitialProps({
                  route: activeRoute,
                  isServer: false,
                  location: window.location
              })
            : {};
    }

    ReactDOM.render(
        <Provider store={store}>
            <Router>
                <Component>
                    <RouterWrapper {...props} />
                </Component>
            </Router>
        </Provider>,
        rootElement,
        () => {
            console.log('App was rendered!!!');
        }
    );
}

export const app = hot(App);

const preRenderPromises = []; // any preparation
Promise.all([preRenderPromises])
    .then(() => {
        console.log('App begin to Render!!!');
        render(app);
    })
    .catch(err => {
        window.console && window.console.error(err);
    });
