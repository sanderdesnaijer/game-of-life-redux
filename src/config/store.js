// @flow
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { loadState, saveState } from '../helpers/localStorage';
import rootReducer from '../reducers';
import rootSaga from '../sagas';
const persistedState = loadState();

const sagaMiddleware = createSagaMiddleware();

let bundle = [
  rootReducer,
  applyMiddleware(...[sagaMiddleware]),
  persistedState,
];

if (IS_DEBUG) {
  bundle = [
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),

    applyMiddleware(...[sagaMiddleware]),
    persistedState,
  ];
}

export const store = createStore(...bundle);

sagaMiddleware.run(rootSaga);

export default store;
