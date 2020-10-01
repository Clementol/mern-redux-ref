import {combineReducers} from 'redux';
import itemReducer from './itemReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import succMsgReducers from './succMsgReducers';

export default combineReducers({
    item: itemReducer,
    error: errorReducer,
    message: succMsgReducers,
    auth: authReducer
})


