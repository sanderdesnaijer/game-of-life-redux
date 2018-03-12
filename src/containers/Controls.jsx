// @flow
import * as React from 'react';

import { connect } from 'react-redux';
import {
  getColumns,
  getRows,
  getCellSize,
  getCellColor,
} from '../reducers/grid';
import { isPlaying, getFps } from '../reducers/gameState';
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
  changeFps,
  randomizeGrid,
  gotoNextFrame,
  gotoPreviousFrame,
  saveGrid,
} from '../actions/actions';

const enhance = connect(
  store => ({
    rows: getRows(store),
    columns: getColumns(store),
    isPlaying: isPlaying(store),
    cellSize: getCellSize(store),
    cellColor: getCellColor(store),
    fps: getFps(store),
  }),
  {
    changeRows,
    changeColumns,
    togglePlay,
    changeCellSize,
    changeCellColor,
    resetGrid,
    changeFps,
    randomizeGrid,
    gotoNextFrame,
    gotoPreviousFrame,
    saveGrid,
  },
);

class Controls extends React.Component {
  onGotoNextFrame = () => {
    this.props.gotoNextFrame();
  };

  onGotoPreviousFrame = () => {
    this.props.gotoPreviousFrame();
  };

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

        <div className="controls__group">
          <Button label="reset" onClick={this.props.resetGrid} />
          <Button label="randomize" onClick={this.props.randomizeGrid} />
        </div>

        <InputNumber
          label="FPS"
          max={1000}
          value={this.props.fps}
          onChange={this.props.changeFps}
        />

        <Button label="save" onClick={this.props.saveGrid} />

        <div className="controls__group">
          <Button label="prev" onClick={this.onGotoPreviousFrame} />
          <ToggleButton
            activeLabel="off"
            inActiveLabel="on"
            isActive={this.props.isPlaying}
            onClick={this.props.togglePlay}
          />
          <Button label="next" onClick={this.onGotoNextFrame} />
        </div>
      </div>
    );
  }
}

export default enhance(Controls);
