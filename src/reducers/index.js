import { combineReducers } from 'redux';
import counter from './counter';
import comments from './comments';
import global from './global';
import menu from './menu';
import setting from './setting';

const rootReducer = combineReducers({
    counter,
    comments,
    global,
    menu,
    setting
});

export default rootReducer;
