import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

import 'antd/dist/antd.css';
import './index.css';

const rootElement = document.getElementById('root');

function render(Component) {
    ReactDOM.render(
        <Provider store={store}>
            <Component />
        </Provider>,
        rootElement
    );
}

const app = hot(App);

render(app);
