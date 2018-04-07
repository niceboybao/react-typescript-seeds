import { createAction, Action } from 'redux-actions';
import { HTTP_GET_FETCH_REQUESTED, HTTP_GET_FETCH_SUCCEEDED, HTTP_GET_FETCH_RESPONSE_ERROR, HTTP_GET_FETCH_FAILED, SHOW_ALL_DATA, SHOW_EVEN_DATA, SHOW_ODD_DATA, CHANGE_SWITCH_STATUS } from './constants';

export const requestData = createAction(HTTP_GET_FETCH_REQUESTED);

export const onRequestDataSuccess = createAction<String>(HTTP_GET_FETCH_SUCCEEDED);

export const onRequestDataResponseError = createAction<number>(HTTP_GET_FETCH_RESPONSE_ERROR);

export const onRequestDataFailed = createAction<String>(HTTP_GET_FETCH_FAILED);

export const showAllData = createAction(SHOW_ALL_DATA);

export const showEvenData = createAction(SHOW_EVEN_DATA);

export const showOddData = createAction(SHOW_ODD_DATA);

export const changeSwitchStatus = createAction(CHANGE_SWITCH_STATUS);
