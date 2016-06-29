import {
    REQUEST_WELCOME_DATA,
    RECEIVE_WELCOME_DATA,
    FAILURE_WELCOME_DATA,
    FILTER_NAME_LIST,
    RECEIVE_ROUND_DATA,
    UPDATE_CURRENT_PLAYER
} from '../actions/welcome';
import {assign, forEach, isUndefined, toLower } from 'lodash';

const initialState = {
    nameList: {},
    filteredNameList: {},
    currentPlayer: '',
    roundData: {}
};

function filterByLetter(state, letter) {
    const nameList = state.nameList;
    const filteredNames = {};

    if (isUndefined(letter)) {
        return nameList;
    }

    forEach(nameList, (listItem, key) => {
        if (toLower(listItem.name.charAt(0)) === toLower(letter)) {
            filteredNames[key] = listItem;
        }
    });

    return filteredNames;
}

export default function welcome(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_WELCOME_DATA:
            state = assign({}, state, {
                nameList: action.state,
                filteredNameList: action.state
            });
            break;

        case FILTER_NAME_LIST:
            const filteredNames = filterByLetter(state, action.letter);

            state = assign({}, state, {
                filteredNameList: filteredNames
            });
            break;

        case RECEIVE_ROUND_DATA:
            state = assign({}, state, {
                roundData: action.state
            });
            break;

        case UPDATE_CURRENT_PLAYER:
            state = assign({}, state, {
                currentPlayer: action.state
            });
            break;

        default:
            return state;
    }

    return state;
}
