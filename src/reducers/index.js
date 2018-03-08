import { combineReducers } from 'redux';

import gridReducer from './grid';

const all = combineReducers({
  gridReducer
});

export default all;
