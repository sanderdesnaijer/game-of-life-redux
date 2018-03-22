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
import { getCurrentFrame, getMode, getPreset } from '../reducers/gameState';
import KEYS from '../constants/keys';
import { calcPixelToGridPosition, calcPreset } from '../helpers';
import { hexToRgb } from '../helpers/color';
import {
  registerContext,
  clickGrid,
  gotoNextFrame,
  copyGrid,
  toggleCell,
  insertPreset,
  togglePlay,
} from '../actions/actions';

const enhance = connect(
  store => ({
    grid: getGrid(store),
    cellSize: getCellSize(store),
    cellColor: getCellColor(store),
    rows: getRows(store),
    columns: getColumns(store),
    mode: getMode(store),
    preset: getPreset(store),
  }),
  {
    registerContext,
    clickGrid,
    gotoNextFrame,
    copyGrid,
    toggleCell,
    insertPreset,
    togglePlay,
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

  constructor(props) {
    super();
    this.state = {
      pressed: false,
      // default mode when pressing
      createAlive: true,
      currentCell: {},
      hoverCells: [],
      grid: props.grid,
      mode: props.mode,

      // TODO move these to reducer
      showTrail: true,
      preset: props.preset,
    };
  }

  registerDom = canvas => (this.canvas = canvas);

  componentDidMount() {
    this.setContext();

    this.canvas.addEventListener('mousedown', this.onMouseDown);
    this.canvas.addEventListener('mouseup', this.onMouseUp);
    this.canvas.addEventListener('mousemove', this.onMouseMove);
    this.canvas.addEventListener('mouseout', this.clearHoverCells);
    window.addEventListener('resize', this.onResize);
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    this.canvas.removeEventListener('mousedown', this.onMouseDown);
    this.canvas.removeEventListener('mouseup', this.onMouseUp);
    this.canvas.removeEventListener('mousemove', this.onMouseMove);
    this.canvas.addEventListener('mouseout', this.clearHoverCells);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('keydown', this.onKeyDown);
  }

  componentWillReceiveProps(nextProps) {
    const nextGrid = nextProps.grid;
    const currentGrid = this.props.grid;

    if (nextProps.mode !== this.props.mode) {
      this.setState({
        mode: nextProps.mode,
      });
    }

    if (nextProps.preset !== this.props.preset) {
      this.setState({
        preset: nextProps.preset,
      });
    }

    if (nextGrid !== currentGrid) {
      if (this.state.showTrail) {
        // TODO make this great again
        const steps = [0.5, 0.4, 0.3, 0.2, 0.1];
        const strengthGrid = nextGrid.map((row, rowI) =>
          row.map((col, colI) => {
            const currentStrength = col;

            // if it has no previous grid, just return current
            if (!currentGrid[rowI] || !currentGrid[rowI][colI])
              return currentStrength;

            const pastStrength = currentGrid[rowI][colI];

            if (pastStrength > currentStrength) {
              if (pastStrength === 1) {
                return steps[0];
              }
              const stepIndex = steps.indexOf(pastStrength);
              const nextStep = stepIndex + 1;
              if (steps[nextStep]) {
                return steps[nextStep];
              }

              return 0;
            }
            return col;
          }),
        );
        // strenght grid
        this.setState({
          grid: strengthGrid,
        });
      } else {
        // normal grid
        this.setState({
          grid: nextGrid,
        });
      }
    }
  }

  componentDidUpdate(nextProps, nextState) {
    if (
      this.state.grid !== nextState.grid ||
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
      const { mode } = this.state;

      // mode
      if (mode === 'drag-add') {
        // console.log(nextState.currentCell);
        // toggle when dragging
        this.hoverCells([
          {
            ...nextState.currentCell,
            value: 1,
          },
        ]);

        // here necesary for dragging
        if (this.state.pressed) {
          this.props.toggleCell(row, col, nextState.createAlive);
        }
      } else if (mode === 'insert-preset') {
        // reset old
        // set new temp
        const presetGrid = calcPreset(
          row,
          col,
          this.state.preset,
          this.props.grid,
        );
        this.hoverCells(presetGrid);
      }
    }
  }

  clearHoverCells = () => {
    const clone = [...this.props.grid];
    // reset to previous one
    this.state.hoverCells.map(cell => {
      clone[cell.row][cell.col] = cell.oldValue;
    });

    this.setState({
      grid: clone,
      pressed: false,
    });
  };

  hoverCells = newCells => {
    console.log(newCells);
    const clone = [...this.props.grid];
    // reset to previous one
    this.state.hoverCells.map(cell => {
      clone[cell.row][cell.col] = cell.oldValue;
    });

    // update with new values
    const newOldCells = [];
    for (let i = 0; i < newCells.length; i++) {
      const newCell = newCells[i];
      const oldValue = clone[newCell.row][newCell.col];
      newOldCells.push({
        ...newCell,
        oldValue,
      });
      clone[newCell.row][newCell.col] = newCell.value;
    }

    this.setState({
      hoverCells: newOldCells,
      grid: clone,
    });
  };

  clearGrid() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  drawGrid() {
    const grid = this.state.grid;
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
    let nextState = {
      pressed: true,
      createAlive: true,
    };

    const { row, col } = this.calcPosition(evt);

    if (row !== null && col !== null) {
      nextState = {
        ...nextState,
        currentCell: {
          row,
          col,
        },
      };

      if (this.state.mode === 'insert-preset') {
        this.setState({
          hoverCells: [],
        });
        this.props.insertPreset(this.state.hoverCells);
      }

      if (this.state.mode === 'drag-add') {
        // calc first cliced element
        const currentValue = this.props.grid[row][col];

        if (currentValue !== undefined) {
          // count faded cells as alive
          const alive = Math.floor(currentValue) === 1;

          this.props.toggleCell(row, col, !alive);

          nextState = {
            ...nextState,
            createAlive: !alive,
          };
        }
      }
    }

    this.setState(nextState);
  };

  onMouseUp = evt => {
    this.setState({
      pressed: false,
      currentCell: {},
    });
  };

  onMouseMove = evt => {
    // if (this.state.pressed || this.state.mode === 'insert-preset') {
    const { row, col } = this.calcPosition(evt);
    if (row !== null && col !== null) {
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
    // }
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
