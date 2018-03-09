import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRows } from '../reducers/grid';
import { createEmptyGrid } from '../actions/actions';
import Canvas from './Canvas';
//import Game from '../helpers/game';

const enhance = connect(
  store => ({
    rows: getRows(store)
  }),
  {
    createEmptyGrid
  }
);

class Game extends Component {
  context: null;
  constructor() {
    super();

    this.state = {
      x: 0
    };
  }

  componentDidMount() {
    this.start();
    requestAnimationFrame(this.update);
  }

  update = () => {
    //console.log('go');
    requestAnimationFrame(this.update);
  };

  start = () => {
    console.log('start game');
    this.props.createEmptyGrid();
  };

  render() {
    return <Canvas />;
  }
}

export default enhance(Game);
