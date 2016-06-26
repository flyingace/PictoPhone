import {push} from 'react-router-redux';

export function goToDrawingPage() {
    return (dispatch) => {
        dispatch(push('/draw'));
    }
}
