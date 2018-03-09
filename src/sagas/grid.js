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
  calcPixelToGridPosition,
  calculateNextState
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
    const columns = yield select(getColumns);
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
  } catch (e) {}
}

function* nextFrame() {
  try {
    const grid = yield select(getGrid);
    const newGrid = calculateNextState(grid);
    yield put(updateGrid(newGrid));
  } catch (e) {
    console.log(e);
  }
}

function* load() {
  yield takeEvery(ACTIONS.CREATE_EMPTY_GRID, createStartGrid);
  yield takeEvery(ACTIONS.CLICK_GRID, clickGrid);
  yield takeEvery(ACTIONS.NEXT_FRAME, nextFrame);
}

export default load;
