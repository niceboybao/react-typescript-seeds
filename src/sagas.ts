import {all, fork} from 'redux-saga/effects';

//各个组件的sagas
import sagaTeam1 from './containers/Team1/sagas';
import sagaTeam3 from './containers/Team3/sagas';
import sagaTeam4 from './containers/Team4/sagas';

export default function* rootSaga() {
    yield all([
        fork(sagaTeam1),
        fork(sagaTeam3),
        fork(sagaTeam4)
        // fork(team4Saga)
    ]);
};
