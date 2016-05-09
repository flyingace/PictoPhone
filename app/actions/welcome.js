// axios will be used when APIs are ready
// https://github.com/mzabriskie/axios
// import axios from 'axios';

export const REQUEST_WELCOME_DATA = 'FETCH_WELCOME_DATA';
export const RECEIVE_WELCOME_DATA = 'RECEIVE_WELCOME_DATA';
export const FAILURE_WELCOME_DATA = 'FAILURE_WELCOME_DATA';

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
		// this is to temperally test mock response from backend
        const data = require('../components/Welcome/__tests__/fixtures/Welcome.json');
        dispatch(receiveWelcomeData(data));

		// return axios.get(api)
		// 	.then((json) => dispatch(receiveWelcomeData(json.data.response.results)))
		// 	.catch(() => dispatch(failureWelcomeData()))
    }
}
