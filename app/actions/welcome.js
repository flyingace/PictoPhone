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
    // database.ref().child('players').push({email:'chickens@chickens.com', name:'chickens', played:false});
    return (dispatch) => {
        dispatch(requestWelcomeData());

        return database.ref('/players/').on('value', (data) => {
            dispatch(receiveWelcomeData(data.val()));
        })
    }
}

export function fetchRoundData() {
    const recordsRef = database.ref('records');

    return (dispatch) => {
        dispatch(requestRoundData());

        return recordsRef.orderByKey().on('child_added', (data) => {
            //this takes only the most recent addition
            let mostRecentRound = [...data.val()].pop();
            dispatch(receiveRoundData(mostRecentRound));
        })
    }
}

export function filterNameList(letter) {
    return {type: FILTER_NAME_LIST, letter};
}

export function updateCurrentPlayer(playerUID) {
    return {type: UPDATE_CURRENT_PLAYER, playerUID}
}

export function goToDescribePage() {
    return (dispatch) => {
        dispatch(push('/describe'));
    }
}
