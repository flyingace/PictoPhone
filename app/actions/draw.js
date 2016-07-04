import firebase from 'firebase';
import {push} from 'react-router-redux';
import {getDateKey} from '../utils/appUtils';

const database = firebase.database();

const storage = firebase.storage();
const storageRef = storage.ref();

/**
 * Send all data from this round to the db
 * @param roundData
 */
export function saveRoundData(roundData) {
    const dateKey = getDateKey();
    const recordsRef = database.ref(dataKey);
    const playersList = database.ref('players');
    const playerID = roundData.playerID;

    recordsRef.push(roundData);
    playersList.child(playerID).update({
        'played': true
    });
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
