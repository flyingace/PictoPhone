import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter from './counter';
import welcome from './welcome';

const rootReducer = combineReducers({
    counter,
    welcome,
    routing
});

export default rootReducer;
