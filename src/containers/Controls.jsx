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
  getTrail,
} from '../reducers/gameState';
import Input from '../components/Input';
import InputNumber from '../components/InputNumber';
import ToggleButton from '../components/ToggleButton';
import Button from '../components/Button';
import ToggleGroup from '../components/ToggleGroup';
import Presets from './Presets';
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
  changeTrail,
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
    trail: getTrail(store),
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
    changeTrail,
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
        <div>
          <h1>John Conway's game of life</h1>
          <p>react, redux, redux-saga</p>
        </div>
        <ToggleGroup title="advanced" open={false}>
          <InputNumber
            label="Rows"
            value={this.props.rows}
            onChange={this.props.changeRows}
            max={150}
          />
          <InputNumber
            label="Columns"
            value={this.props.columns}
            onChange={this.props.changeColumns}
            max={150}
          />
          <InputNumber
            label="Size"
            value={this.props.cellSize}
            onChange={this.props.changeCellSize}
            max={50}
          />
          <InputNumber
            label="Trail"
            value={this.props.trail}
            onChange={this.props.changeTrail}
            min={0}
            max={10}
          />
          <Input
            className="color"
            value={this.props.cellColor}
            type="text"
            validate="hex"
            label="Hex Color"
            onChange={this.props.changeCellColor}
          />
          <InputNumber
            label="FPS"
            max={60}
            value={this.props.fps}
            onChange={this.props.changeFps}
          />
        </ToggleGroup>
        <ToggleGroup align="horizontal" title="grid" open={false}>
          <Button label="reset" onClick={this.props.resetGrid} />
          <Button label="clear" onClick={this.props.clearGrid} />
          <Button label="randomize" onClick={this.props.randomizeGrid} />
          <Button icon="save" onClick={this.props.saveGrid} />
          <Button
            active={this.props.direction === 'forwards'}
            icon="sync"
            onClick={this.props.changePlayDirection}
          />
        </ToggleGroup>
        <ToggleGroup align="horizontal" title="controls" open={true}>
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
        </ToggleGroup>
        <ToggleGroup title="presets" className="presets" open={true}>
          <Presets />
        </ToggleGroup>
      </div>
    );
  }
}

export default enhance(Controls);
