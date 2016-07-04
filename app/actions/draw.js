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
    //TODO: put this section into a dateNow util
    const dateNow = new Date();
    const dataKey = `records/${dateNow.getDate()}${dateNow.getMonth() + 1}${dateNow.getFullYear()}`;
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
