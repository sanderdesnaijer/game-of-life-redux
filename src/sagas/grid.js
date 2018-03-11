import { ActionCreators } from 'redux-undo';
import {
  call,
  put,
  takeEvery,
  takeLatest,
  select,
  take
} from 'redux-saga/effects';
import ACTIONS from '../constants/actions';
import {
  updateGrid,
  toggleCell,
  loadGrid,
  copyGrid as copyGridAction
} from '../actions/actions';
import {
  createEmptyGrid,
  createFixtureGrid,
  calcPixelToGridPosition,
  calculateNextState,
  recalcGrid
} from '../helpers';
import { loadState, saveState } from '../helpers/localStorage';
import {
  getRows,
  getColumns,
  getGrid,
  getGridPosition,
  getGridState
} from '../reducers/grid';

import { getCurrentFrame } from '../reducers/gameState';

function* createStartGrid(action) {
  try {
    const storedState = loadState();

    if (storedState) {
      yield put(loadGrid(storedState));
    } else {
      // create fixture data
      const { rows, columns } = yield select(getGridPosition);
      const emptyGrid = createEmptyGrid(rows, columns);
      const fixtureGrid = createFixtureGrid(emptyGrid);

      // update store
      yield put(updateGrid(fixtureGrid));
    }
  } catch (e) {
    console.log(e);
  }
}

function* saveGrid() {
  try {
    const currentState = yield select(getGridState);
    saveState(currentState);
    yield put(copyGridAction(currentState.grid));
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
    if (row !== null || col !== null) {
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

function* prevFrame() {
  const t = yield put(ActionCreators.undo());
  console.log(t);
}

function* copyGrid(action) {
  try {
    const { grid } = action.payload;

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
  yield takeEvery(ACTIONS.SAVE_GRID, saveGrid);
  yield takeEvery(ACTIONS.PREV_FRAME, prevFrame);
}

export default load;
