import { REQUEST_WELCOME_DATA, RECEIVE_WELCOME_DATA, FAILURE_WELCOME_DATA } from '../actions/welcome';
import { assign } from 'lodash';

const initialState = {
    nameList: []
}

export default function welcome(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_WELCOME_DATA:
            state = assign({}, state, {
                nameList: action.state.nameList
            });

        default:
            return state;
    }
    return state;
}
