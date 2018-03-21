// @flow
import ACTIONS from '../constants/actions';

import { calcTotalCells } from '../helpers';

const cellSize = 20;

const initialState = {
  cellSize,
  rows: calcTotalCells(cellSize, 'vertical'),
  columns: calcTotalCells(cellSize, 'horizontal'),
  grid: [],
  cellColor: '#0fb8ea',
};

export const hasPreviousGrid = store => {
  if (store.gridReducer.past.length) {
    const totalPast = store.gridReducer.past.length;
    return store.gridReducer.past[totalPast - 1].grid.length > 0;
  }
  return false;
};
export const getGridState = store => store.gridReducer.present;
export const getRows = store => store.gridReducer.present.rows;
export const getColumns = store => store.gridReducer.present.columns;
export const getGrid = store => store.gridReducer.present.grid;
export const getCellSize = store => store.gridReducer.present.cellSize;
export const getCellColor = store => store.gridReducer.present.cellColor;
export const getGridPosition = store => {
  const { rows, columns, cellSize } = store.gridReducer.present;
  return {
    rows,
    columns,
    cellSize,
  };
};

export const getGridPast = store => store.gridReducer.past;

const gridReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LOAD_GRID: {
      const { grid } = action.payload;
      return {
        ...grid,
      };
    }
    case ACTIONS.UPDATE_GRID: {
      const { grid } = action.payload;
      return {
        ...state,
        grid,
      };
    }
    case ACTIONS.INSERT_PRESET: {
      const { cells } = action.payload;
      const clone = [...state.grid];

      const gridMap = cells.map(cell => {
        clone[cell.row][cell.col] = cell.value;
      });

      // const cloneGrid = state.grid
      return {
        grid: clone,
        ...state,
      };
    }
    case ACTIONS.TOGGLE_CELL: {
      const { row, col, toggle } = action.payload;
      // reset past if length
      const grid = state.grid.map((gRow, rowI) =>
        gRow.map((gCol, colI) => {
          if (col === colI && row == rowI) {
            return toggle ? 1 : 0;
          }
          return gCol;
        }),
      );
      return {
        ...state,
        grid,
      };
    }
    case ACTIONS.CHANGE_COLUMNS: {
      const { columns } = action.payload;
      return {
        ...state,
        columns,
      };
    }
    case ACTIONS.CHANGE_ROWS: {
      const { rows } = action.payload;
      return {
        ...state,
        rows,
      };
    }
    case ACTIONS.CHANGE_CELL_SIZE: {
      const { cellSize } = action.payload;
      return {
        ...state,
        cellSize,
      };
    }
    case ACTIONS.CHANGE_CELL_COLOR: {
      const { cellColor } = action.payload;
      return {
        ...state,
        cellColor,
      };
    }
    case ACTIONS.CLEAR_GRID: {
      const grid = state.grid.map(row => row.map(col => 0));
      return {
        ...state,
        grid,
      };
    }
    case ACTIONS.RANDOMIZE_GRID: {
      const grid = state.grid.map(row =>
        row.map(col => Math.round(Math.random())),
      );
      return {
        ...state,
        grid,
      };
    }

    default: {
      return state;
    }
  }
};

export default gridReducer;
