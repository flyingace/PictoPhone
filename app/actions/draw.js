import firebase from 'firebase';
import {push} from 'react-router-redux';

const database = firebase.database();

const storage = firebase.storage();
const storageRef = storage.ref();


export function saveRoundData(roundData) {
    const recordsRef = database.ref('records/06242016');
    recordsRef.push(roundData);

    // return (dispatch) => {
    //     dispatch(requestDescription());
    //     //TODO: A function to submit all data related to this round to the server

        // return storageRef('/players/').on('value', (data) => {
        //     dispatch(receiveDescriptionData(data.val()));
        // });
    // }
}

export function goToThankYouPage() {
    return (dispatch) => {
        dispatch(push('/thankYou'));
    }
}
