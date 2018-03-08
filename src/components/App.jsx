import * as React from 'react';
import { connect } from 'react-redux';
import { getRows } from '../reducers/grid';
import { createEmptyGrid } from '../actions/actions';

import Game from './Game';

const enhance = connect(
  store => ({
    rows: getRows(store)
  }),
  {
    createEmptyGrid
  }
);

class App extends React.Component {
  onClick = () => {
    this.props.createEmptyGrid();
  };
  render() {
    return (
      <div className="gerrit">
        <Game />
        <button onClick={this.onClick}>Csslick</button>
        Hello jongeman {this.props.rows}
      </div>
    );
  }
}

export default enhance(App);
