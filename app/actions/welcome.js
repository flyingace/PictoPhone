// axios will be used when APIs are ready
// https://github.com/mzabriskie/axios
// import axios from 'axios';

import firebase from 'firebase';
import { FIREBASE_API_KEY, DATABASE_URL } from '../../keys';
import { push } from 'react-router-redux';

const firebaseRef = firebase.initializeApp({
    apiKey: FIREBASE_API_KEY,
    databaseURL: DATABASE_URL
});

export const REQUEST_WELCOME_DATA = 'FETCH_WELCOME_DATA';
export const RECEIVE_WELCOME_DATA = 'RECEIVE_WELCOME_DATA';
export const FAILURE_WELCOME_DATA = 'FAILURE_WELCOME_DATA';

export const FILTER_NAME_LIST ='FILTER_NAME_LIST';

export function requestWelcomeData() {
    return { type: REQUEST_WELCOME_DATA};
}

export function receiveWelcomeData(data) {
    return { type: RECEIVE_WELCOME_DATA, state: data }
}

export function failureWelcomeData() {
    return { type: FAILURE_WELCOME_DATA }
}

export function fetchWelcomeData(api) {
    return (dispatch) => {
        dispatch(requestWelcomeData());

        return firebaseRef.database().ref('/players/').on('value', (data) => {
            dispatch(receiveWelcomeData(data.val()));
        });
    }
}

export function filterNameList(letter) {
    return { type: FILTER_NAME_LIST, letter };
}

export function goToDrawingPage() {
    return (dispatch) => {
        dispatch(push('/draw'));
    }
}
