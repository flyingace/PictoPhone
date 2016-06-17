// axios will be used when APIs are ready
// https://github.com/mzabriskie/axios
// import axios from 'axios';

import firebase from 'firebase';
import { FIREBASE_API_KEY, STORAGE_BUCKET } from '../../keys';
import { push } from 'react-router-redux';

const storageRef = firebase.initializeApp({
    apiKey: FIREBASE_API_KEY,
    storage: STORAGE_BUCKET
});

export const REQUEST_DRAWING_DATA = 'FETCH_DRAWING_DATA';
export const RECEIVE_DRAWING_DATA = 'RECEIVE_DRAWING_DATA';
export const FAILURE_DRAWING_DATA = 'FAILURE_DRAWING_DATA';

export const FILTER_NAME_LIST ='FILTER_NAME_LIST';

export function requestDrawingData() {
    return { type: REQUEST_DRAWING_DATA};
}

export function receiveDrawingData(data) {
    return { type: RECEIVE_DRAWING_DATA, state: data }
}

export function failureDrawingData() {
    return { type: FAILURE_DRAWING_DATA }
}

export function fetchDrawingData(api) {
    return (dispatch) => {
        dispatch(requestDrawingData());

        return firebaseRef.database().ref('/players/').on('value', (data) => {
            dispatch(receiveDrawingData(data.val()));
        });
    }
}

export function filterNameList(letter) {
    return { type: FILTER_NAME_LIST, letter };
}

export function goToDescribePage() {
    return (dispatch) => {
        dispatch(push('/describe'));
    }
}
