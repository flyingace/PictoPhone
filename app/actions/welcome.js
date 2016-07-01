import firebase from 'firebase';
import {push} from 'react-router-redux';

const database = firebase.database();

export const REQUEST_WELCOME_DATA = 'FETCH_WELCOME_DATA';
export const RECEIVE_WELCOME_DATA = 'RECEIVE_WELCOME_DATA';
export const FAILURE_WELCOME_DATA = 'FAILURE_WELCOME_DATA';
export const REQUEST_ROUND_DATA = 'FETCH_ROUND_DATA';
export const RECEIVE_ROUND_DATA = 'RECEIVE_ROUND_DATA';
export const FAILURE_ROUND_DATA = 'FAILURE_ROUND_DATA';

export const FILTER_NAME_LIST = 'FILTER_NAME_LIST';
export const UPDATE_CURRENT_PLAYER = 'UPDATE_CURRENT_PLAYER';

export function requestWelcomeData() {
    return {type: REQUEST_WELCOME_DATA};
}

export function receiveWelcomeData(data) {
    return {type: RECEIVE_WELCOME_DATA, state: data}
}

export function failureWelcomeData() {
    return {type: FAILURE_WELCOME_DATA}
}

export function requestRoundData() {
    return {type: REQUEST_ROUND_DATA};
}

export function receiveRoundData(data) {
    return {type: RECEIVE_ROUND_DATA, state: data}
}

export function failureRoundData() {
    return {type: FAILURE_ROUND_DATA}
}

export function updateCurrentPlayer(data) {
    return {type: UPDATE_CURRENT_PLAYER, state: data}
}

export function fetchWelcomeData() {
    return (dispatch) => {
        dispatch(requestWelcomeData());

        return database.ref('/players/').on('value', (data) => {
            dispatch(receiveWelcomeData(data.val()));
        })
    }
}

export function fetchRoundData() {
    //TODO: Need to find a way to determine the date folder's name
    const recordsRef = database.ref('records/06242016');

    return (dispatch) => {
        dispatch(requestRoundData());

        //TODO: How can this be refactored?
        //this takes only the previous round's data
        return recordsRef.orderByKey().limitToLast(1).on('value', (data) => {
            let previousRoundKey = Object.keys(data.val())[0];
            let mostRecentRound = data.val()[previousRoundKey];
            dispatch(receiveRoundData(mostRecentRound));
        })
    }
}

export function filterNameList(letter) {
    return {type: FILTER_NAME_LIST, letter};
}

export function goToDescribePage() {
    return (dispatch) => {
        dispatch(push('/describe'));
    }
}
