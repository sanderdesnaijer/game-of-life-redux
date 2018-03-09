import {
  call,
  put,
  takeEvery,
  takeLatest,
  select,
  take
} from 'redux-saga/effects';
import ACTIONS from '../constants/actions';
import { updateGrid, toggleCell } from '../actions/actions';
import {
  createEmptyGrid,
  createFixtureGrid,
  calcPixelToGridPosition
} from '../helpers';
import {
  getRows,
  getColumns,
  getGrid,
  getGridPosition
} from '../reducers/grid';

function* createStartGrid(action) {
  try {
    const rows = yield select(getRows);
    const columns = yield select(getRows);
    const emptyGrid = createEmptyGrid(rows, columns);
    const fixtureGrid = createFixtureGrid(emptyGrid);

    // update store
    yield put(updateGrid(fixtureGrid));
  } catch (e) {}
}

function* clickGrid(action) {
  try {
    const { x, y } = action.payload;
    const { columns, rows, cellSize } = yield select(getGridPosition);
    const { row, col } = calcPixelToGridPosition(x, y, columns, rows, cellSize);

    // update store
    yield put(toggleCell(row, col));
  } catch (e) {
    console.log(e);
  }
}

function* load() {
  yield takeEvery(ACTIONS.CREATE_EMPTY_GRID, createStartGrid);
  yield takeEvery(ACTIONS.CLICK_GRID, clickGrid);
}

export default load;
