import {
    UPDATE_CURRENT_DESCRIPTION
} from '../actions/describe';
import {assign} from 'lodash';

const initialState = {
    currentDescription: ''
};


export default function describe(state = initialState, action) {
    switch (action.type) {

        case UPDATE_CURRENT_DESCRIPTION:
            state = assign({}, state, {
                currentDescription: action.state
            });
            break;

        default:
            return state;
    }

    return state;
}
