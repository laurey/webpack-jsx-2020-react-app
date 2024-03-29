import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']({ trace: true, traceLimit: 50 }) || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
