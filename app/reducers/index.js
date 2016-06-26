import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import welcome from './welcome';

const rootReducer = combineReducers({
    welcome,
    routing
});

export default rootReducer;
