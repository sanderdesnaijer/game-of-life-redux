// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../components/Button';
import Canvas from '../components/Canvas';
import presets from '../constants/presets';

import { activatePreset } from '../actions/actions';
import { getActivePreset } from '../reducers/gameState';

const enhance = connect(
  (store, props) => ({
    isActive: getActivePreset(store, props.preset.id),
  }),
  {
    activatePreset,
  },
);
class Presets extends Component {
  onClick = () => {
    const { id, grid } = this.props.preset;
    console.log(id, grid);
    this.props.activatePreset(id, grid);
  };

  render() {
    const className = `presets__item ${this.props.isActive ? 'active' : ''}`;

    return (
      <li className={className}>
        <a onClick={this.onClick}>
          <Canvas
            cellSize={20}
            grid={this.props.preset.grid}
            cellColor="#00ff00"
          />
        </a>
      </li>
    );
  }
}
export default enhance(Presets);
