import firebase from 'firebase';
import {push} from 'react-router-redux';
import {getDateKey} from '../utils/appUtils';
import {forEach} from 'lodash';
const database = firebase.database();

export const REQUEST_WELCOME_DATA = 'FETCH_WELCOME_DATA';
export const RECEIVE_WELCOME_DATA = 'RECEIVE_WELCOME_DATA';
export const FAILURE_WELCOME_DATA = 'FAILURE_WELCOME_DATA';
export const REQUEST_ROUND_DATA = 'FETCH_ROUND_DATA';
export const RECEIVE_ROUND_DATA = 'RECEIVE_ROUND_DATA';
export const FAILURE_ROUND_DATA = 'FAILURE_ROUND_DATA';

export const FILTER_NAME_LIST = 'FILTER_NAME_LIST';
export const UPDATE_CURRENT_PLAYER = 'UPDATE_CURRENT_PLAYER';

export const COMPLETE_RESET_DATA = 'COMPLETE_RESET_DATA';

export function completeResetDate() {
    return {type: COMPLETE_RESET_DATA}
}

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

export function resetData() {
    return (dispatch) => {
        const dateKey = getDateKey();
        const recordsDateKey = `records/${dateKey}`;
        const playersList = database.ref('players');
        const recordsRef = database.ref('records');
        const recordsRefWithKey = database.ref(recordsDateKey);

        recordsRef.on('value', (snapShot) => {
            var hasDateKey = snapShot.hasChild(dateKey);

            if (!hasDateKey) {
                recordsRefWithKey.push({
                    'playerID': '',
                    'description': '',
                    'drawing': ''
                }, (err) => {
                    if (err) {
                        console.log("Data could not be saved." + err);
                    } else {
                        console.log("Data saved successfully.");
                        dispatch(completeResetDate());
                    }
                });

                playersList.on('value', (players) => {
                    forEach(players.val(), (player, key) => {
                        console.log('player.key()', key);
                        playersList.child(key).update({
                            'played': false
                        });
                    });
                });
            }
        });
    }
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
    const dateKey = getDateKey();
    const recordsKey = `records/${dateKey}`;
    const recordsRef = database.ref(recordsKey);

    return (dispatch) => {
        dispatch(requestRoundData());

        //TODO: How can this be refactored?
        //this takes only the previous round's data
        return recordsRef.orderByKey().limitToLast(1).on('value', (data) => {
            const previousRoundKey = Object.keys(data.val())[0];
            const mostRecentRound = data.val()[previousRoundKey];
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
