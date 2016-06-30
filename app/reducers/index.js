import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import welcome from './welcome';
import describe from './describe';

const rootReducer = combineReducers({
    routing,
    welcome,
    describe
});

export default rootReducer;
