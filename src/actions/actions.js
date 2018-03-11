import ACTIONS from '../constants/actions';

export const createEmptyGrid = () => ({
  type: ACTIONS.CREATE_EMPTY_GRID
});

export const registerContext = context => ({
  type: ACTIONS.REGISTER_CONTEXT,
  payload: {
    context
  }
});

export const clickGrid = (x, y) => ({
  type: ACTIONS.CLICK_GRID,
  payload: {
    x,
    y
  }
});

export const updateGrid = grid => ({
  type: ACTIONS.UPDATE_GRID,
  payload: {
    grid
  }
});

export const resetGrid = () => ({
  type: ACTIONS.RESET_GRID
});

export const toggleCell = (row, col) => ({
  type: ACTIONS.TOGGLE_CELL,
  payload: {
    row,
    col
  }
});

export const gotoNextFrame = () => ({
  type: ACTIONS.NEXT_FRAME
});

export const copyGrid = () => ({
  type: ACTIONS.COPY_GRID
});

export const changeRows = rows => ({
  type: ACTIONS.CHANGE_ROWS,
  payload: {
    rows
  }
});

export const changeColumns = columns => ({
  type: ACTIONS.CHANGE_COLUMNS,
  payload: {
    columns
  }
});

export const togglePlay = playing => ({
  type: ACTIONS.TOGGLE_PLAY,
  payload: {
    playing
  }
});

export const changeCellSize = cellSize => ({
  type: ACTIONS.CHANGE_CELL_SIZE,
  payload: {
    cellSize
  }
});

export const changeCellColor = cellColor => ({
  type: ACTIONS.CHANGE_CELL_COLOR,
  payload: {
    cellColor
  }
});

export const changeFps = fps => ({
  type: ACTIONS.CHANGE_FPS,
  payload: {
    fps
  }
});
