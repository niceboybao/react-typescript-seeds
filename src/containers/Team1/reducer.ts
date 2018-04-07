import {createAction, handleActions, Action} from 'redux-actions';

// 最外层constants 统一命名
import {RN_TEAM1} from '../../constants';
//组件的 constants
import {
    INCREMENT,
    DECREMENT,
    INITMENT,

    REQUESTDATASUCCESS,
    REQUESTDATAERROR,
    REQUESTDATAFAILD

} from './constants';

export const name = RN_TEAM1;

export const team1Reducer = handleActions({
    //计数器方法+
    [INCREMENT]: (state, action: Action<number>) => {
        return Object.assign({}, state, {
            count: state.count + action.payload
        });
    },
    //计数器方法-
    [DECREMENT]: (state, action: Action<number>) => {
        return Object.assign({}, state, {
            count: state.count - action.payload
        });
    },
    //初始化计时器
    [INITMENT]: (state, action: Action<number>) => {
        debugger;
        return Object.assign({}, state, {
            count: action.payload
        });
    },
    
    //获取数据方法
    [REQUESTDATASUCCESS]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            getData: action.payload
        });
    },
    [REQUESTDATAERROR]: (state, action: Action<any>) => {
        return Object.assign({}, state, {

        });
    },
    [REQUESTDATAFAILD]: (state, action: Action<any>) => {
        return Object.assign({}, state, {

        });
    }
}, {
        getData: {},
        count: 0
    }
);
