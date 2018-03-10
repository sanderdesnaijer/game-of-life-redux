import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGrid, getCellSize } from '../reducers/grid';
import KEYS from '../constants/keys';

import {
  registerContext,
  clickGrid,
  gotoNextFrame,
  copyGrid
} from '../actions/actions';

const enhance = connect(
  store => ({
    grid: getGrid(store),
    cellSize: getCellSize(store)
  }),
  {
    registerContext,
    clickGrid,
    gotoNextFrame,
    copyGrid
  }
);

class Canvas extends Component {
  canvas = null;
  ctx = null;

  constructor() {
    super();
    this.state = {
      width: null,
      height: null
    };
  }

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

  componentWillReceiveProps(nextProps) {
    if (this.props.grid !== nextProps.grid) {
      this.drawGrid(nextProps.grid);
    }
  }

  clearGrid() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  drawGrid(grid) {
    const context = this.ctx;
    const cellSize = this.props.cellSize;

    this.clearGrid();

    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        const alive = grid[r][c];
        const color = alive ? '#FF0000' : '#FFFFFF';

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
      this.props.copyGrid();
    }
  };

  render() {
    return <canvas id="main-canvas" ref={this.registerDom} />;
  }
}

export default enhance(Canvas);
