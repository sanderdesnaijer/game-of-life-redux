// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRows } from '../reducers/grid';
import { createEmptyGrid } from '../actions/actions';

import Game from '../containers/Game';
import Controls from '../containers/Controls';

type Props = {};

class App extends React.Component<Props> {
  render() {
    return [<Controls key="controls" />, <Game key="game" />];
  }
}

export default App;
