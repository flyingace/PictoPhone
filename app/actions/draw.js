import firebase from 'firebase';
import {push} from 'react-router-redux';

const storage = firebase.storage();
const storageRef = storage.ref();


export function saveRoundData() {
    return (dispatch) => {
        dispatch(requestDescription());
        //TODO: A function to submit all data related to this round to the server

        // return storageRef('/players/').on('value', (data) => {
        //     dispatch(receiveDescriptionData(data.val()));
        // });
    }
}

export function goToThankYouPage() {
    return (dispatch) => {
        dispatch(push('/thankYou'));
    }
}
