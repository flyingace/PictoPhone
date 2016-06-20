// axios will be used when APIs are ready
// https://github.com/mzabriskie/axios
// import axios from 'axios';

import firebase from 'firebase';
import { push } from 'react-router-redux';

const storage = firebase.storage();
const storageRef = storage.ref();

export const REQUEST_DRAWING_DATA = 'FETCH_DRAWING_DATA';
export const RECEIVE_DRAWING_DATA = 'RECEIVE_DRAWING_DATA';
export const FAILURE_DRAWING_DATA = 'FAILURE_DRAWING_DATA';

export function requestDrawingData() {
    return { type: REQUEST_DRAWING_DATA};
}

export function receiveDrawingData(data) {
    return { type: RECEIVE_DRAWING_DATA, state: data }
}

export function failureDrawingData() {
    return { type: FAILURE_DRAWING_DATA }
}

export function saveDrawingData(api) {
    return (dispatch) => {
        dispatch(requestDrawingData());

        return storageRef('/players/').on('value', (data) => {
            dispatch(receiveDrawingData(data.val()));
        });
    }
}

export function goToDescribePage() {
    return (dispatch) => {
        dispatch(push('/describe'));
    }
}
