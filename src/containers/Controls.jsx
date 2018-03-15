// @flow
import * as React from 'react';

import { connect } from 'react-redux';
import {
  getColumns,
  getRows,
  getCellSize,
  getCellColor,
  hasPreviousGrid,
} from '../reducers/grid';
import {
  isPlaying,
  getFps,
  getDirection,
  getCurrentFrame,
} from '../reducers/gameState';
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
  changePlayDirection,
  clearGrid,
} from '../actions/actions';

const enhance = connect(
  store => ({
    rows: getRows(store),
    columns: getColumns(store),
    isPlaying: isPlaying(store),
    cellSize: getCellSize(store),
    cellColor: getCellColor(store),
    currentFrame: getCurrentFrame(store),
    fps: getFps(store),
    hasPreviousGrid: hasPreviousGrid(store),
    direction: getDirection(store),
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
    changePlayDirection,
    clearGrid,
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
    const disablePlay =
      this.props.currentFrame === 0 && this.props.direction === 'backwards';
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
          <Button icon="clear" onClick={this.props.clearGrid} />
          <Button label="randomize" onClick={this.props.randomizeGrid} />
        </div>

        <InputNumber
          label="FPS"
          max={60}
          value={this.props.fps}
          onChange={this.props.changeFps}
        />
        <div className="controls__group">
          <Button icon="save" onClick={this.props.saveGrid} />
          <Button
            active={this.props.direction === 'forwards'}
            icon="sync"
            onClick={this.props.changePlayDirection}
          />
        </div>
        <div className="controls__group">
          <Button
            icon="skip_previous"
            onClick={this.onGotoPreviousFrame}
            disabled={!this.props.hasPreviousGrid}
          />
          <ToggleButton
            activeIcon="pause"
            inActiveIcon="play_arrow"
            isActive={this.props.isPlaying}
            onClick={this.props.togglePlay}
            disabled={disablePlay}
          />
          <Button icon="skip_next" onClick={this.onGotoNextFrame} />
        </div>
      </div>
    );
  }
}

export default enhance(Controls);
