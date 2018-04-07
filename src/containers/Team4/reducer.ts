import {createAction, handleActions, Action} from 'redux-actions';
import {HTTP_GET_FETCH_SUCCEEDED, HTTP_GET_FETCH_RESPONSE_ERROR, HTTP_GET_FETCH_FAILED, SHOW_ALL_DATA, SHOW_ODD_DATA, SHOW_EVEN_DATA, CHANGE_SWITCH_STATUS} from './constants';
import {RN_TEAM4_HTTP_QUERY} from '../../constants'

export const name = RN_TEAM4_HTTP_QUERY;

const httpReducer = handleActions({
    [HTTP_GET_FETCH_SUCCEEDED]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            httpData: (state.httpData as Array<Object>).concat(JSON.stringify(action.payload, null, 4))
        });
    },
    [HTTP_GET_FETCH_RESPONSE_ERROR]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            httpData: (state.httpData as Array<Object>).concat('[' + action.payload + ']')
        });
    },
    [HTTP_GET_FETCH_FAILED]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            httpData: (state.httpData as Array<Object>).concat('[' + action.payload + ']')
        });
    },
    [SHOW_ALL_DATA]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            httpDataFilter: "ALL"
        });
    },
    [SHOW_EVEN_DATA]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            httpDataFilter: "EVEN"
        });
    },
    [SHOW_ODD_DATA]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            httpDataFilter: "ODD"
        });
    },
    [CHANGE_SWITCH_STATUS]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            switchStatus: !state.switchStatus
        });
    }
},
    {
        httpData: ['[initdata]'],
        httpDataFilter: 'ALL',
        switchStatus: false
    });

export default httpReducer;
