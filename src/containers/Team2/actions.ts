import { createAction, Action } from 'redux-actions';
import { INCREMENT, DECREMENT } from './constants';

export const increment = createAction<Number>(INCREMENT);

export const decrement = createAction<Number>(DECREMENT);
