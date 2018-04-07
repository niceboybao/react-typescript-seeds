import 'react-hot-loader/patch';
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import {Provider, connect} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import {AppContainer} from 'react-hot-loader';
import {createBrowserHistory} from 'history';
//import createLogger from 'redux-logger';
import {ConnectedRouter, routerReducer, routerMiddleware, push} from 'react-router-redux';
import Es6Promise from 'es6-promise';
import * as log from 'loglevel';
import './styles/app.css';

import createReducer from './reducers';
import {Hello} from './components/Hello/';
import {RootContainer} from './containers/RootContainer/';
import rootSaga from './sagas';
import {HEMPConfig} from './config';

// Es6Promise.polyfill();

// import antd css
import '!style-loader!css-loader!antd/dist/antd.min.css';

// init hempConfig
window.hempConfig = new HEMPConfig;

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
window.sagaMiddleware = sagaMiddleware;

// set log level
if (process.env.NODE_ENV === 'production') {
    log.setLevel("info");
} else {
    log.setLevel("debug");
}

// override console.log
//console.log = (message: any, ...objs: object[]) => {
//    if (log.getLevel() <= log.levels.DEBUG) {
//         console.groupCollapsed(message, ...objs);
//         console.trace('stack trace');
//         console.groupEnd();
//     } else {
//         log.debug(message, ...objs);
//     }
// };


// Create a history
let appBase = '/www';
let basepath = window.location.href.match(/\/\/([^\/]*)\/(.*)\/www/);
if (basepath !== undefined && basepath !== null && basepath.length == 3) {
    appBase = '/' + basepath[2] + appBase;
}
const history = createBrowserHistory({basename: appBase});
// const history = createBrowserHistory({ basename: '/www'});

// Create react-router-redux middleware
const reduxRouterMiddleware = routerMiddleware(history);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    createReducer(undefined),
    //    使用applyMiddleware函数将创建的saga Middleware实例绑定到store上
    composeEnhancers(applyMiddleware(sagaMiddleware, reduxRouterMiddleware))
);
window.store = store;
//sagaMiddleware的run函数来执行某个或者某些Middleware
sagaMiddleware.run(rootSaga);

// init asyncReducers holder on window
window.asyncReducers = {};

ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <RootContainer />
            </ConnectedRouter>
        </Provider>
    </AppContainer>,
    document.getElementById("rootElement")
);

// ReactDOM.render(
//         <RootLayout/>,
//     document.getElementById("rootElement")
// );

// if (module.hot) {
//     module.hot.accept('./components/RootLayout.tsx', () => {
//         const NextRootContainer = require('./components/RootLayout').default;
//         ReactDOM.render(
//             <NextRootContainer/>,
//             document.getElementById("rootElement")
//         );
//     });
// }
