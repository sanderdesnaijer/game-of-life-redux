// @flow
import React, { Component } from 'react';

import Button from '../components/Button';
import Preset from '../components/Preset';
import presets from '../constants/presets';

class Presets extends Component {
  render() {
    return (
      <div className="presets-container">
        <h2>Presets</h2>
        <ul className="presets">
          {presets.map((preset, i) => (
            <li className="presets__item" key={i}>
              <Preset cellSize={20} grid={preset.grid} cellColor="#00ff00" />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default Presets;
