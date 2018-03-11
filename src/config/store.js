import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { loadState, saveState } from '../helpers/localStorage';
import rootReducer from '../reducers';
import rootSaga from '../sagas';
const persistedState = loadState();

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(...[sagaMiddleware]),
  persistedState
);

sagaMiddleware.run(rootSaga);

export default store;
