import ACTIONS from '../constants/actions';

const initialState = {
  rows: 20,
  columns: 20
};

export const getRows = store => store.gridReducer.rows;

const gridReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.CREATE_EMPTY_GRID: {
      console.log(action.payload);
      return {
        ...state,
        ...action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export default gridReducer;
