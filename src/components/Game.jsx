import * as React from 'react';
import { connect } from 'react-redux';
import { getRows } from '../reducers/grid';
import { createEmptyGrid } from '../actions/actions';

import Game from '../helpers/game';

const enhance = connect(
  store => ({
    rows: getRows(store)
  }),
  {
    createEmptyGrid
  }
);

class App extends React.Component {
  componentDidMount() {
    const game = new Game();
  }
  onClick = () => {
    this.props.createEmptyGrid();
  };
  render() {
    return (
      <div className="container">
        <div className="input">
          <input type="number" id="rows" placeholder="rows" value="12" />
        </div>
        <div className="input">
          <input type="number" id="columns" placeholder="rows" value="12" />
        </div>
        <div className="input">
          <button id="btn-next">next</button>
        </div>
        <div className="input">
          <button id="play">play</button>
        </div>
        <div className="input">
          <button id="stop">stop</button>
        </div>

        <canvas id="main-canvas" width="100%" height="100%" />
      </div>
    );
  }
}

export default enhance(App);
