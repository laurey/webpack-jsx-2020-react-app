import { combineReducers } from 'redux';
import counter from './counter';
import comments from './comments';
import global from './global';
import menu from './menu';
import user from './user';
import form from './form';
import setting from './setting';

const rootReducer = combineReducers({
    counter,
    comments,
    global,
    menu,
    user,
    form,
    setting
});

export default rootReducer;
