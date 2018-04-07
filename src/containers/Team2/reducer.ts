import {createAction, handleActions, Action} from 'redux-actions';
import {INCREMENT, DECREMENT} from './constants';

import {RN_TEAM2_COUNTER} from '../../constants'

export const name = RN_TEAM2_COUNTER;

export const counterReducer = handleActions({
    [INCREMENT]: (state, action: Action<number>) => {
        return Object.assign({}, state, {
            count: state.count + action.payload
        });
    },
    [DECREMENT]: (state, action: Action<number>) => {
        return Object.assign({}, state, {
            count: state.count - action.payload
        });
    }
}, {count: 0});
