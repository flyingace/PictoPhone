// axios will be used when APIs are ready
// https://github.com/mzabriskie/axios
// import axios from 'axios';

export const REQUEST_DESCRIBE_DATA = 'FETCH_DESCRIBE_DATA';
export const RECEIVE_DESCRIBE_DATA = 'RECEIVE_DESCRIBE_DATA';
export const FAILURE_DESCRIBE_DATA = 'FAILURE_DESCRIBE_DATA';

export const FILTER_NAME_LIST ='FILTER_NAME_LIST';

export function requestWelcomeData() {
    return { type: REQUEST_DESCRIBE_DATA};
}

export function receiveWelcomeData(data) {
    return { type: RECEIVE_DESCRIBE_DATA, state: data }
}

export function failureWelcomeData() {
    return { type: FAILURE_DESCRIBE_DATA }
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

export function filterNameList(letter) {
    return { type: FILTER_NAME_LIST, letter };
}
