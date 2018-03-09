import * as React from 'react';
import { connect } from 'react-redux';
import { getRows } from '../reducers/grid';
import { createEmptyGrid } from '../actions/actions';

import Game from '../containers/Game';

class App extends React.Component {
  render() {
    return <Game />;
  }
}

export default App;
