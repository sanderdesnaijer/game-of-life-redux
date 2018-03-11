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
  calculateNextState,
  recalcGrid
} from '../helpers';
import {
  getRows,
  getColumns,
  getGrid,
  getGridPosition
} from '../reducers/grid';

function* createStartGrid(action) {
  try {
    const { rows, columns } = yield select(getGridPosition);
    const emptyGrid = createEmptyGrid(rows, columns);
    const fixtureGrid = createFixtureGrid(emptyGrid);

    // update store
    yield put(updateGrid(fixtureGrid));
  } catch (e) {
    console.log(e);
  }
}

function* clickGrid(action) {
  try {
    const { x, y } = action.payload;
    const { columns, rows, cellSize } = yield select(getGridPosition);
    const { row, col } = calcPixelToGridPosition(x, y, columns, rows, cellSize);

    // update store
    if (row || col) {
      yield put(toggleCell(row, col));
    }
  } catch (e) {}
}

function* nextFrame() {
  try {
    const grid = yield select(getGrid);
    const newGrid = calculateNextState(grid);

    // update store
    yield put(updateGrid(newGrid));
  } catch (e) {
    console.log(e);
  }
}

function* copyGrid() {
  try {
    const grid = yield select(getGrid);

    const filtered = grid.reduce((list, row, rowI) => {
      const t = row.map((col, colI) => {
        if (col) {
          list.push([rowI, colI]);
        }
      });
      return list;
    }, []);

    let string = '';
    filtered.map((row, rowI) => {
      string = `${string}[${row[0]},${row[1]}],`;
    });
    string = `[${string}]`;
    console.log(string);
  } catch (e) {
    console.log(e);
  }
}

function* changeDimensions(action) {
  const { rows, columns } = yield select(getGridPosition);
  const emptyGrid = createEmptyGrid(rows, columns);
  const grid = yield select(getGrid);

  const newGrid = recalcGrid(emptyGrid, grid);

  // store
  yield put(updateGrid(newGrid));
}

function* load() {
  yield takeEvery(
    [ACTIONS.CREATE_EMPTY_GRID, ACTIONS.RESET_GRID],
    createStartGrid
  );
  yield takeEvery(ACTIONS.CLICK_GRID, clickGrid);
  yield takeEvery(ACTIONS.NEXT_FRAME, nextFrame);
  yield takeEvery(ACTIONS.COPY_GRID, copyGrid);
  yield takeEvery(
    [ACTIONS.CHANGE_COLUMNS, ACTIONS.CHANGE_ROWS],
    changeDimensions
  );
}

export default load;
