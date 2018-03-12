// @flow
import React, { Component } from 'react';
import Game from '../containers/Game';
import Controls from '../containers/Controls';

type Props = {};

class App extends Component<Props> {
  render() {
    return [<Controls key="controls" />, <Game key="game" />];
  }
}

export default App;
