// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { getGrid, getCellSize, getCellColor } from '../reducers/grid';
import { getCurrentFrame } from '../reducers/gameState';
import KEYS from '../constants/keys';

import {
  registerContext,
  clickGrid,
  gotoNextFrame,
  copyGrid,
} from '../actions/actions';

const enhance = connect(
  store => ({
    grid: getGrid(store),
    cellSize: getCellSize(store),
    cellColor: getCellColor(store),
  }),
  {
    registerContext,
    clickGrid,
    gotoNextFrame,
    copyGrid,
  },
);

class Canvas extends React.Component {
  canvas = null;
  ctx = null;

  registerDom = canvas => (this.canvas = canvas);

  componentDidMount() {
    this.setContext();
    this.canvas.addEventListener('click', this.clickGrid);
    window.addEventListener('resize', this.onResize);
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    this.canvas.removeEventListener('click', this.clickGrid);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('keydown', this.onKeyDown);
  }

  componentDidUpdate(nextProps) {
    // console.log(this.props.grid, nextProps.grid);
    if (
      this.props.grid !== nextProps.grid ||
      this.props.cellColor !== nextProps.cellColor ||
      this.props.cellSize !== nextProps.cellSize
    ) {
      this.drawGrid();
    }
  }

  clearGrid() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  drawGrid() {
    const grid = this.props.grid;
    const context = this.ctx;
    const cellSize = this.props.cellSize;
    console.log(cellSize);
    this.clearGrid();

    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        const alive = grid[r][c];
        const color = alive ? this.props.cellColor : '#FFFFFF';
        const drawAll = true;

        if (drawAll) {
          const x = c * cellSize;
          const y = r * cellSize;
          const width = cellSize;
          const height = cellSize;

          // order matters
          context.strokeStyle = '#000';
          context.lineWidth = 1;
          context.strokeRect(x, y, width, height);

          context.fillStyle = color;
          context.fillRect(x, y, width, height);
        }
      }
    }
  }

  setContext = () => {
    this.ctx = this.canvas.getContext('2d');
    this.ctx.canvas.width = window.innerWidth;
    this.ctx.canvas.height = window.innerHeight;
  };

  onResize = () => {
    this.ctx.canvas.width = window.innerWidth;
    this.ctx.canvas.height = window.innerHeight;
    this.drawGrid(this.props.grid);
  };

  clickGrid = evt => {
    const { layerX, layerY } = evt;
    this.props.clickGrid(layerX, layerY);
  };

  onKeyDown = evt => {
    // space
    if (evt.keyCode === KEYS.SPACE) {
      this.props.gotoNextFrame();
    }
    // c
    if (evt.keyCode === KEYS.C) {
      this.props.copyGrid(this.props.grid);
    }
  };

  render() {
    return <canvas id="main-canvas" ref={this.registerDom} />;
  }
}

export default enhance(Canvas);
