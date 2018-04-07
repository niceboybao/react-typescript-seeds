import { createAction, Action } from 'redux-actions';
import { HTTP_GET_FETCH_REQUESTED, HTTP_GET_FETCH_SUCCEEDED, HTTP_GET_FETCH_RESPONSE_ERROR, HTTP_GET_FETCH_FAILED} from './constants';

export const requestData = createAction(HTTP_GET_FETCH_REQUESTED);

export const onRequestDataSuccess = createAction<String>(HTTP_GET_FETCH_SUCCEEDED);

export const onRequestDataResponseError = createAction<number>(HTTP_GET_FETCH_RESPONSE_ERROR);

export const onRequestDataFailed = createAction<String>(HTTP_GET_FETCH_FAILED);
