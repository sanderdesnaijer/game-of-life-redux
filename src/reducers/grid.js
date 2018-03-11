import ACTIONS from '../constants/actions';

const initialState = {
  context: null,
  cellSize: 20,
  rows: 20,
  columns: 20,
  grid: [],
  playing: true,
  cellColor: '#fff000',
  fps: 10
};

export const getContext = store => store.gridReducer.context;
export const getRows = store => store.gridReducer.rows;
export const getColumns = store => store.gridReducer.columns;
export const getGrid = store => store.gridReducer.grid;
export const getCellSize = store => store.gridReducer.cellSize;
export const getCellColor = store => store.gridReducer.cellColor;
export const getFps = store => store.gridReducer.fps;
export const getGridPosition = store => {
  const { rows, columns, cellSize } = store.gridReducer;
  return {
    rows,
    columns,
    cellSize
  };
};
export const isPlaying = store => store.gridReducer.playing;

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
            const alive = state.grid[rowI][colI];

            return alive === 1 ? 0 : 1;
          }
          return gCol;
        })
      );
      return {
        ...state,
        grid
      };
    }
    case ACTIONS.CHANGE_COLUMNS: {
      const { columns } = action.payload;
      return {
        ...state,
        columns
      };
    }
    case ACTIONS.CHANGE_ROWS: {
      const { rows } = action.payload;
      return {
        ...state,
        rows
      };
    }
    case ACTIONS.TOGGLE_PLAY: {
      const { playing } = action.payload;
      return {
        ...state,
        playing
      };
    }
    case ACTIONS.CHANGE_CELL_SIZE: {
      const { cellSize } = action.payload;
      return {
        ...state,
        cellSize
      };
    }
    case ACTIONS.CHANGE_CELL_COLOR: {
      const { cellColor } = action.payload;
      return {
        ...state,
        cellColor
      };
    }
    case ACTIONS.CHANGE_FPS: {
      const { fps } = action.payload;
      return {
        ...state,
        fps
      };
    }

    default: {
      return state;
    }
  }
};

export default gridReducer;
