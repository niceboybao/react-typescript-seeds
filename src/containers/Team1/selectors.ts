import {createSelector} from 'reselect';

//data
//createSelector(...inputSelectors | [inputSelectors], resultFunc)
//const data = (state: any) => state.team1Reducer.getData;
//const data = function (state: any) {
//    return state.team1Reducer.getData;
//}
//export const dataSelector = createSelector(
//    data,
//    (data: any) => {
//        debugger;
//        return data;
//    }
//)
////count
//const count = (state: any) => state.team1Reducer.count as number;
//export const countSelector = createSelector(
//    [count],
//    (count: number) => {
//        debugger;
//        return count;
//    }
//);


export function dataSelector(state: any) {
    debugger
    return state.team1Reducer.getData;
}

export function countSelector(state: any) {
    debugger
    return state.team1Reducer.count as number;
}

