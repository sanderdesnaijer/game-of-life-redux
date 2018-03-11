import React, { Component } from 'react';

import { connect } from 'react-redux';
import {
  getColumns,
  getRows,
  isPlaying,
  getCellSize,
  getCellColor,
  getFps
} from '../reducers/grid';
import Input from '../components/Input';
import InputNumber from '../components/InputNumber';
import ToggleButton from '../components/ToggleButton';
import Button from '../components/Button';
import {
  changeRows,
  changeColumns,
  togglePlay,
  changeCellSize,
  changeCellColor,
  resetGrid,
  changeFps
} from '../actions/actions';

const enhance = connect(
  store => ({
    rows: getRows(store),
    columns: getColumns(store),
    isPlaying: isPlaying(store),
    cellSize: getCellSize(store),
    cellColor: getCellColor(store),
    fps: getFps(store)
  }),
  {
    changeRows,
    changeColumns,
    togglePlay,
    changeCellSize,
    changeCellColor,
    resetGrid,
    changeFps
  }
);

class Controls extends Component {
  render() {
    return (
      <div className="controls">
        <InputNumber
          label="Rows"
          value={this.props.rows}
          onChange={this.props.changeRows}
        />

        <InputNumber
          label="Columns"
          value={this.props.columns}
          onChange={this.props.changeColumns}
        />

        <InputNumber
          label="Size"
          value={this.props.cellSize}
          onChange={this.props.changeCellSize}
        />

        <Input
          value={this.props.cellColor}
          type="text"
          validate="hex"
          label="Hex Color"
          onChange={this.props.changeCellColor}
        />

        <InputNumber
          label="FPS"
          max={1000}
          value={this.props.fps}
          onChange={this.props.changeFps}
        />

        <ToggleButton
          activeLabel="on"
          inActiveLabel="off"
          isActive={this.props.isPlaying}
          onClick={this.props.togglePlay}
        />

        <Button label="reset" onClick={this.props.resetGrid} />
      </div>
    );
  }
}

export default enhance(Controls);
