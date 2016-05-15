import {
    REQUEST_WELCOME_DATA,
    RECEIVE_WELCOME_DATA,
    FAILURE_WELCOME_DATA,
    FILTER_NAME_LIST } from '../actions/welcome';
import { assign, forEach, isUndefined } from 'lodash';

const initialState = {
    nameList: [],
    filteredNameList: []
}

function filterByLetter(state, letter) {
    const nameList = state.nameList;
    const filteredNames = [];

    if (isUndefined(letter)) {
        return nameList;
    }

    nameList.forEach((listItem) => {
        if (listItem.name.charAt(0) === letter) {
            filteredNames.push(listItem);
        }
    });

    return filteredNames;
}

export default function welcome(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_WELCOME_DATA:
            state = assign({}, state, {
                nameList: action.state.nameList,
                filteredNameList: action.state.nameList
            });
            break;

        case FILTER_NAME_LIST:
            const filteredNames = filterByLetter(state, action.letter);

            state = assign({}, state, {
                filteredNameList: filteredNames
            });
            break;

        default:
            return state;
    }
    return state;
}
