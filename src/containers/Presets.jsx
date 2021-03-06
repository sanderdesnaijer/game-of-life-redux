// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Preset from './Preset';
import Button from '../components/Button';
import presets from '../constants/presets';

import { activatePreset } from '../actions/actions';
import { getActivePreset } from '../reducers/gameState';

const enhance = connect(
  store => ({
    activePreset: getActivePreset(store),
  }),
  {
    activatePreset,
  },
);
class Presets extends Component {
  onClick = preset => {
    this.props.activatePreset(preset.id, preset.grid);
  };

  render() {
    return (
      <div className="presets-container">
        <ul className="presets">
          {presets.map((preset, i) => (
            <Preset key={preset.id} preset={preset} />
          ))}
        </ul>
      </div>
    );
  }
}
export default enhance(Presets);
