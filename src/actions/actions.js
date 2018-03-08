import ACTIONS from '../constants/actions';

export const createEmptyGrid = () => ({
  type: ACTIONS.CREATE_EMPTY_GRID,
  payload: {
    rows: 10,
    columns: 15
  }
});
