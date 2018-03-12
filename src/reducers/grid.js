// @flow
import ACTIONS from '../constants/actions';

const initialState = {
  cellSize: 20,
  rows: 20,
  columns: 20,
  grid: [],
  cellColor: '#66D',
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
    case ACTIONS.TOGGLE_CELL: {
      const { row, col } = action.payload;
      const grid = state.grid.map((gRow, rowI) =>
        gRow.map((gCol, colI) => {
          if (col === colI && row == rowI) {
            const alive = state.grid[rowI][colI];

            return alive === 1 ? 0 : 1;
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
