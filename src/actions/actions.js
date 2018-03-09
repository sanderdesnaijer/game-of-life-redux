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
