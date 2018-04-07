import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { Action } from 'redux-actions';
import fetch from 'isomorphic-fetch';
import { requestData, onRequestDataSuccess, onRequestDataResponseError, onRequestDataFailed } from './actions'
import { HTTP_GET_FETCH_REQUESTED } from './constants';

function* fetchData(action: Action<any>) {
    try {
        const response = (yield call(fetch, 'http://httpbin.org/get')) as Response;
        if(response.ok) {
            const json = yield response.json();
            // yield put({type: "HTTP_GET_FETCH_SUCCEEDED", payload: json});
            yield put(onRequestDataSuccess(json));
        } else {
            // yield put({type: "HTTP_GET_FETCH_RESPONSE_ERROR", payload: response.status});
            yield put(onRequestDataResponseError(response.status));
        }
    } catch (e) {
        // yield put({type: "HTTP_GET_FETCH_FAILED", payload: e.message});
        yield put(onRequestDataFailed(e.message));
    }
}

export default function* saga() {
    // yield takeEvery("HTTP_GET_FETCH_REQUESTED", fetchData);
    yield takeEvery(HTTP_GET_FETCH_REQUESTED, fetchData);
}
