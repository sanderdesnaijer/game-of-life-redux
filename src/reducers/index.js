import { combineReducers } from 'redux';

import gridReducer from './grid';
import gameStateReducer from './gameState';

const all = combineReducers({
  gridReducer,
  gameStateReducer
});

export default all;
