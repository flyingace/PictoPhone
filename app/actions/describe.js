// axios will be used when APIs are ready
// https://github.com/mzabriskie/axios
// import axios from 'axios';

export const REQUEST_DESCRIBE_DATA = 'FETCH_DESCRIBE_DATA';
export const RECEIVE_DESCRIBE_DATA = 'RECEIVE_DESCRIBE_DATA';
export const FAILURE_DESCRIBE_DATA = 'FAILURE_DESCRIBE_DATA';

export const FILTER_NAME_LIST ='FILTER_NAME_LIST';

export function requestDescribeData() {
    return { type: REQUEST_DESCRIBE_DATA};
}

export function receiveDescribeData(data) {
    return { type: RECEIVE_DESCRIBE_DATA, state: data }
}

export function failureDescribeData() {
    return { type: FAILURE_DESCRIBE_DATA }
}

export function fetchDescribeData(api) {
    return (dispatch) => {
        dispatch(requestDescribeData());

        return axios.get(api)
         .then((json) => dispatch(receiveDescribeData(json.data.response.results)))
         .catch(() => dispatch(failureDescribeData()))
    }
}
