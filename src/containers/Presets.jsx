// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../components/Button';
import Preset from '../components/Preset';
import presets from '../constants/presets';

import { activatePreset } from '../actions/actions';

const enhance = connect(store => ({}), {
  activatePreset,
});
class Presets extends Component {
  onClick = preset => {
    this.props.activatePreset(preset.name, preset.grid);
  };

  render() {
    return (
      <div className="presets-container">
        <h2>Presets</h2>
        <ul className="presets">
          {presets.map((preset, i) => (
            <li
              className="presets__item"
              key={i}
              onClick={() => this.onClick(preset)}
            >
              <Preset cellSize={20} grid={preset.grid} cellColor="#00ff00" />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default enhance(Presets);
