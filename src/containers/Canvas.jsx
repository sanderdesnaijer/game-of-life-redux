// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import {
  getGrid,
  getCellSize,
  getCellColor,
  getColumns,
  getRows,
} from '../reducers/grid';
import { getCurrentFrame } from '../reducers/gameState';
import KEYS from '../constants/keys';
import { calcPixelToGridPosition } from '../helpers';
import { hexToRgb } from '../helpers/color';
import {
  registerContext,
  clickGrid,
  gotoNextFrame,
  copyGrid,
  toggleCell,
} from '../actions/actions';

const enhance = connect(
  store => ({
    grid: getGrid(store),
    cellSize: getCellSize(store),
    cellColor: getCellColor(store),
    rows: getRows(store),
    columns: getColumns(store),
  }),
  {
    registerContext,
    clickGrid,
    gotoNextFrame,
    copyGrid,
    toggleCell,
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

  state = {
    pressed: false,
    // default mode when pressing
    createAlive: true,
    currentCell: {},
  };

  registerDom = canvas => (this.canvas = canvas);

  componentDidMount() {
    this.setContext();

    this.canvas.addEventListener('mousedown', this.onMouseDown);
    this.canvas.addEventListener('mouseup', this.onMouseUp);
    this.canvas.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('resize', this.onResize);
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    this.canvas.removeEventListener('mousedown', this.onMouseDown);
    this.canvas.removeEventListener('mouseup', this.onMouseUp);
    this.canvas.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('keydown', this.onKeyDown);
  }

  componentDidUpdate(nextProps, nextState) {
    if (
      this.props.grid !== nextProps.grid ||
      this.props.cellColor !== nextProps.cellColor ||
      this.props.cellSize !== nextProps.cellSize
    ) {
      this.drawGrid();
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (
      nextState.currentCell !== this.state.currentCell &&
      nextState.currentCell.row !== undefined
    ) {
      const { row, col } = nextState.currentCell;

      this.props.toggleCell(row, col, nextState.createAlive);
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

        // simple
        const strength = cell;

        if (alive) {
          // order matters
          context.strokeStyle = '#000';
          context.lineWidth = 1;
          context.strokeRect(x, y, cellSize, cellSize);

          context.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b}, ${strength})`;
          context.fillRect(x, y, cellSize, cellSize);
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

  calcPosition = evt => {
    const { layerX, layerY } = evt;
    const { row, col } = calcPixelToGridPosition(
      layerX,
      layerY,
      this.props.columns,
      this.props.rows,
      this.props.cellSize,
    );
    return {
      row,
      col,
    };
  };

  onMouseDown = evt => {
    let newState = {
      pressed: true,
      createAlive: true,
    };

    const { row, col } = this.calcPosition(evt);

    if (row !== null && col !== null) {
      newState = {
        ...newState,
        currentCell: {
          row,
          col,
        },
      };

      // calc first cliced element
      const currentValue = this.props.grid[row][col];
      if (currentValue !== undefined) {
        // count faded cells as alive
        const alive = Math.floor(currentValue) === 1;

        newState = {
          ...newState,
          createAlive: !alive,
        };
      }
    }

    this.setState(newState);
  };

  onMouseUp = evt => {
    this.setState({
      pressed: false,
      currentCell: {},
    });
  };

  onMouseMove = evt => {
    if (this.state.pressed) {
      const { row, col } = this.calcPosition(evt);
      if (row && col) {
        if (
          this.state.currentCell.row !== row ||
          this.state.currentCell.col !== col
        ) {
          this.setState({
            ...this.state,
            currentCell: {
              row,
              col,
            },
          });
        }
      }
    }
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
