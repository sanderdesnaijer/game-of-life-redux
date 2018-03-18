import undoable from 'redux-undo';

import { combineReducers } from 'redux';

import gridReducer from './grid';
import gameStateReducer from './gameState';

import ACTIONS from '../constants/actions';

const all = combineReducers({
  gridReducer: undoable(gridReducer, {
    limit: 50, // set a limit for the history
    //filter: excludeAction(ACTIONS.)
  }),
  gameStateReducer,
});

export default all;
