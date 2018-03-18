// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { getGrid, getCellSize, getCellColor } from '../reducers/grid';
import { getCurrentFrame } from '../reducers/gameState';
import KEYS from '../constants/keys';
import { hexToRgb } from '../helpers/color';
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

type Props = {
  grid: Object,
  cellSize: number,
  cellColor: string,
};

class Canvas extends React.Component<Props> {
  canvas: HTMLElement;
  ctx = null;
  cells = {};

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

    this.clearGrid();

    const rgb = hexToRgb(this.props.cellColor);

    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        const cell = grid[r][c];
        const alive = cell > 0;
        const x = c * cellSize;
        const y = r * cellSize;
        const width = cellSize;
        const height = cellSize;

        // simple
        //const color = alive ? this.props.cellColor : '#FFFFFF';
        const drawAll = false;

        let strength = cell;

        if (drawAll || alive) {
          // order matters
          context.strokeStyle = '#000';
          context.lineWidth = 1;
          context.strokeRect(x, y, width, height);

          context.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b}, ${strength})`;
          context.fillRect(x, y, width, height);

          //this.cells[cell].draw(c, r, cellSize, this.props.cellColor, alive);
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
