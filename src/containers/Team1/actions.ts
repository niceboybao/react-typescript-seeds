import {createAction, Action} from 'redux-actions';
import {
    INCREMENT,
    DECREMENT,
    INITMENT,
    
    REQUESTDATA,
    REQUESTDATASUCCESS,
    REQUESTDATAERROR,
    REQUESTDATAFAILD
    
} from './constants';

//计数器方法
export const increment = createAction<Number>(INCREMENT);
export const decrement = createAction<Number>(DECREMENT);
export const initment = createAction<Number>(INITMENT);

//获取书籍
export const requestData = createAction<any>(REQUESTDATA);
export const requestDataSuccess = createAction<any>(REQUESTDATASUCCESS);
export const requestDataError = createAction<any>(REQUESTDATAERROR);
export const requestDataFaild = createAction<any>(REQUESTDATAFAILD);
