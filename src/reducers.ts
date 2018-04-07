import {combineReducers} from "redux";
import {createAction, handleActions, Action} from 'redux-actions';
import {routerReducer} from 'react-router-redux';

//组件render引入
import {team1Reducer, name as team1ReducerName} from './containers/Team1/reducer';

import {counterReducer as counterReducerForTeam2, name as counterReducerForTeam2Name} from './containers/Team2/reducer';
import {httpReducer, name as httpReducerName} from './containers/Team3/reducer';
import {RN_ROUTER} from './constants';

// import team4HttpReducer from './containers/Team4/reducer';

// export const appReducers = combineReducers({
//     router: routerReducer,
//     teamCounter: counterReducer,
//     team2Counter: counterReducerForTeam2,
//     httpQuery: httpReducer,
//     team4HttpQuery: team4HttpReducer
// });

export default function createReducer(asyncReducers: any) {
    return combineReducers({
        [RN_ROUTER]: routerReducer,
        [team1ReducerName]: team1Reducer,
        [counterReducerForTeam2Name]: counterReducerForTeam2,
        [httpReducerName]: httpReducer,
        // team4HttpQuery: team4HttpReducer,
        ...asyncReducers,
    });
}
