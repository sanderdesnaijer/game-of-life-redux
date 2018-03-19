// @flow
import React, { Component } from 'react';

import Button from '../components/Button';
import Preset from '../components/Preset';

const glider = {
  name: 'glider',
  grid: [[0, 1, 0], [0, 0, 1], [1, 1, 1]],
};

const halfCircle = {
  name: 'oops',
  grid: [
    [1, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
    [0, 0, 0, 1],
    [0, 0, 0, 1],
    [0, 0, 1, 0],
    [1, 1, 0, 0],
  ],
};

const presets = [glider, halfCircle];

class Presets extends Component {
  render() {
    return (
      <div className="presets-container">
        <ul className="presets">
          {presets.map((preset, i) => (
            <li className="preset-item" key={i}>
              <Preset cellSize={20} grid={preset.grid} cellColor="#00ff00" />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default Presets;
