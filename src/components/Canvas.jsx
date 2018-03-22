// @flow
import * as React from 'react';
import { hexToRgb } from '../helpers/color';

type Props = {
  cellColor: string,
  grid: Array<*>,
  cellSize: number,
  width: number,
  height: number,
};
class Canvas extends React.Component<Props> {
  static defaultProps = {
    width: 100,
    height: 100,
  };
  canvas: HTMLElement;
  ctx = null;

  registerDom = canvas => (this.canvas = canvas);

  componentDidMount() {
    this.setContext();
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
        const lineWidth = 1;
        const fillStyle = alive
          ? `rgba(${rgb.r},${rgb.g},${rgb.b}, ${strength})`
          : '#FFF';
        const strokeStyle = alive ? '#000' : 'DDD';
        // order matters
        context.fillStyle = fillStyle;
        context.fillRect(x, y, cellSize, cellSize);

        context.strokeStyle = strokeStyle;
        context.lineWidth = lineWidth;
        context.strokeRect(x, y, cellSize, cellSize);
      }
    }
  }

  setContext = () => {
    // make a function here and resue, 2 == 2 x linewidth
    const height = this.props.grid.length * this.props.cellSize;
    const width = this.props.grid[0].length * this.props.cellSize;

    this.ctx = this.canvas.getContext('2d');
    this.ctx.canvas.width = width;
    this.ctx.canvas.height = height;
    this.drawGrid();
  };

  onResize = () => {
    this.drawGrid();
  };

  render() {
    // make a function here and resue, 2 == 2 x linewidth
    const height = this.props.grid.length * this.props.cellSize + 2;
    const width = this.props.grid[0].length * this.props.cellSize + 2;
    return (
      <canvas width={`${width}`} height={`${height}`} ref={this.registerDom} />
    );
  }
}

export default Canvas;
