import { combineReducers } from 'redux';
import counter from './counter';
import comments from './comments';

const rootReducer = combineReducers({
    counter,
    comments
});

export default rootReducer;
