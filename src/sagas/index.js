import { fork } from 'redux-saga/effects';
import gridSaga from './grid';

function* rootSaga() {
  yield [fork(gridSaga)];
}
export default rootSaga;
