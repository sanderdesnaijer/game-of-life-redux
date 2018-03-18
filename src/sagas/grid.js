// @flow
import { ActionCreators } from 'redux-undo';
import {
  call,
  put,
  takeEvery,
  takeLatest,
  select,
  take,
} from 'redux-saga/effects';
import ACTIONS from '../constants/actions';
import {
  updateGrid,
  toggleCell as toggleCellAction,
  loadGrid,
  copyGrid as copyGridAction,
} from '../actions/actions';
import {
  createEmptyGrid,
  createFixtureGrid,
  calcPixelToGridPosition,
  calculateNextState,
  recalcGrid,
} from '../helpers';
import { loadState, saveState } from '../helpers/localStorage';
import {
  getRows,
  getColumns,
  getGrid,
  getGridPosition,
  getGridState,
  getGridPast,
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
    if (IS_DEBUG) {
      yield put(copyGridAction(currentState.grid));
    }
  } catch (e) {
    console.log(e);
  }
}

const steps = [0.5, 0.4, 0.3, 0.2, 0.1];

function* nextFrame() {
  try {
    const grid = yield select(getGrid);
    const newGrid = calculateNextState(grid);

    // calc strength
    const strengthGrid = newGrid.map((row, rowI) =>
      row.map((col, colI) => {
        const currentStrength = col;
        const pastStrength = grid[rowI][colI];

        if (pastStrength > currentStrength) {
          if (pastStrength === 1) {
            return steps[0];
          }
          const stepIndex = steps.indexOf(pastStrength);
          const nextStep = stepIndex + 1;
          if (steps[nextStep]) {
            return steps[nextStep];
          }

          return 0;
        }
        return col;
      }),
    );

    // update store
    yield put(updateGrid(strengthGrid));
  } catch (e) {
    console.log(e);
  }
}

function* prevFrame() {
  const undo = yield put(ActionCreators.undo());
  console.log('undo', undo);
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
    createStartGrid,
  );
  yield takeEvery(ACTIONS.NEXT_FRAME, nextFrame);
  yield takeEvery(ACTIONS.COPY_GRID, copyGrid);
  yield takeEvery(
    [ACTIONS.CHANGE_COLUMNS, ACTIONS.CHANGE_ROWS],
    changeDimensions,
  );
  yield takeEvery(ACTIONS.SAVE_GRID, saveGrid);
  yield takeEvery(ACTIONS.PREV_FRAME, prevFrame);
}

export default load;
