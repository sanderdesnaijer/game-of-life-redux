// @flow
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { loadState, saveState } from '../helpers/localStorage';
import rootReducer from '../reducers';
import rootSaga from '../sagas';
const persistedState = loadState();

const sagaMiddleware = createSagaMiddleware();

const bundle = [
  rootReducer,
  applyMiddleware(...[sagaMiddleware]),
  persistedState,
];

if (IS_DEBUG) {
  // add redux devtools specifc on index 1 before the sagas
  bundle.splice(
    1,
    0,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
}

export const store = createStore(...bundle);

sagaMiddleware.run(rootSaga);

export default store;
