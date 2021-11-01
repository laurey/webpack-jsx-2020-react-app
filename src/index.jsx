import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store';
import App from './App';

import 'antd/dist/antd.css';
import './index.css';

const rootElement = document.getElementById('root');

function render(Component) {
    ReactDOM.render(
        <Provider store={store}>
            <Router>
                <Component />
            </Router>
        </Provider>,
        rootElement
    );
}

export const app = hot(App);

render(app);
