import {push} from 'react-router-redux';

/**
 * Update the router so the player is returned to the start
 * @returns {function()}
 */
export function returnToStart() {
    return (dispatch) => {
        dispatch(push('/'));
    }
}
