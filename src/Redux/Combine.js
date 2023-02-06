import {combineReducers } from 'redux';

import AuthReducer from './Authredux';
import PostRedux from './Postredux';

const rootReducer = combineReducers({
    Auth : AuthReducer ,
    Post : PostRedux
});


export default rootReducer;