import firebase from 'firebase';
import {push} from 'react-router-redux';

const database = firebase.database();

const storage = firebase.storage();
const storageRef = storage.ref();

/**
 * Send all data from this round to the db
 * @param roundData
 */
export function saveRoundData(roundData) {
    //TODO: find a way to get the date directory dynamically
    const recordsRef = database.ref('records/06242016');
    recordsRef.push(roundData);
}

/**
 * Update the router so the player is taken to the Thank You page
 * @returns {function()}
 */
export function goToThankYouPage() {
    return (dispatch) => {
        dispatch(push('/thankYou'));
    }
}
