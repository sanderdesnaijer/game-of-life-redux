import ACTIONS from '../constants/actions';

const initialState = {
  context: null,
  cellSize: 25,
  rows: 20,
  columns: 20,
  grid: []
};

export const getContext = store => store.gridReducer.context;
export const getRows = store => store.gridReducer.rows;
export const getColumns = store => store.gridReducer.columns;
export const getGrid = store => store.gridReducer.grid;
export const getCellSize = store => store.gridReducer.cellSize;
export const getGridPosition = store => {
  const { rows, columns, cellSize } = store.gridReducer;
  return {
    rows,
    columns,
    cellSize
  };
};

const gridReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.REGISTER_CONTEXT: {
      const { context } = action.payload;
      return {
        ...state,
        context
      };
    }
    case ACTIONS.UPDATE_GRID: {
      const { grid } = action.payload;
      return {
        ...state,
        grid
      };
    }
    case ACTIONS.TOGGLE_CELL: {
      const { row, col } = action.payload;
      const grid = state.grid.map((gRow, rowI) =>
        gRow.map((gCol, colI) => {
          if (col === colI && row == rowI) {
            const alive = state.grid[colI][rowI];
            return !alive;
          }
          return gCol;
        })
      );
      return {
        ...state,
        grid
      };
    }
    default: {
      return state;
    }
  }
};

export default gridReducer;
