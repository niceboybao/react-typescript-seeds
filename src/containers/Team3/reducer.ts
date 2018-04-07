import { createAction, handleActions, Action } from 'redux-actions';
import { HTTP_GET_FETCH_SUCCEEDED, HTTP_GET_FETCH_RESPONSE_ERROR, HTTP_GET_FETCH_FAILED} from './constants';
import { RN_HTTP_QUERY } from '../../constants'

export const name = RN_HTTP_QUERY;

export const httpReducer = handleActions({
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
    }
}, { httpData: ['[initdata]'] });
