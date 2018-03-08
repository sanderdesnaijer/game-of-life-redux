import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects';
import ACTIONS from '../constants/actions';
import * as actions from '../actions/actions';
//import * as fixtures from '../config/fixtures';

function* loadFixtures(action) {
  try {
    console.log('actie', action);
  } catch (e) {
    console.log('kut', e);
  }
}

function* load() {
  yield takeEvery(ACTIONS.CREATE_EMPTY_GRID, loadFixtures);
}

export default load;
