import undoable from 'redux-undo';

import { combineReducers } from 'redux';

import gridReducer from './grid';
import gameStateReducer from './gameState';

const all = combineReducers({
  gridReducer: undoable(gridReducer, {
    //  limit: 10 // set a limit for the history
  }),
  gameStateReducer
});

export default all;
