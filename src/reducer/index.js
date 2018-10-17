import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import user from './user';
const rootReducer = combineReducers({
    user,
    routing: routerReducer,
})

export default rootReducer;