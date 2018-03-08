// http://disruptive-communications.com/conwaylifejavascript/
//import Controls from './controls';

class Game {
  constructor() {
    this.initCanvas();
    // options
    this.rows = 10;
    this.columns = 10;
    this.rectSize = 30;

    // controls
    this.initControls();

    // create empty grid
    this.grid = this.createEmptyGrid(this.rows, this.columns);

    this.fillStartGrid();

    this.update();

    document.addEventListener('keydown', event => {
      // space
      if (event.keyCode === 32) {
        this.grid = this.calculateNextState();
        this.update();
      }
    });
  }

  initCanvas() {
    const canvas = document.getElementById('main-canvas');
    const offset = canvas.getBoundingClientRect();
    const { top, bottom, left, right } = offset;

    this.ctx = canvas.getContext('2d');

    this.ctx.canvas.width = window.innerWidth - left - right;
    this.ctx.canvas.height = window.innerHeight - top - bottom;

    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;

    canvas.addEventListener('click', event => {
      const { layerX, layerY } = event;
      const { row, col } = this.calcPixelToGridPosition(layerX, layerY);
      if (row || col) {
        this.updateGridElement(row, col);
      }
    });
  }

  initControls() {
    const rowDom = document.getElementById('rows');
    const colDom = document.getElementById('columns');

    rowDom.addEventListener('keyup', event => {
      this.setState('rows', event.target.value);
    });

    colDom.addEventListener('keyup', event => {
      this.setState('columns', event.target.value);
    });
  }

  setState(prop, value) {
    this[prop] = parseInt(value);

    this.grid = this.recalcGrid();
    this.update();
  }

  calcPixelToGridPosition(x, y) {
    const width = this.columns * this.rectSize;
    const height = this.rows * this.rectSize;
    // col
    if (x > width || y > height) {
      return {
        row: null,
        col: null
      };
    }
    const percentageX = x / width * this.columns;
    const percentageY = y / height * this.rows;

    const col = Math.floor(percentageX);
    const row = Math.floor(percentageY);

    console.table({ percentageX, percentageY, row, col });

    return {
      row,
      col
    };
  }

  updateGridElement(row, col) {
    const newGrid = this.grid.map((rowEl, rowI) => {
      return rowEl.map((colEl, colI) => {
        if (row === rowI && col === colI) {
          const alive = colEl === 1;
          return alive ? 0 : 1;
        }
        return colEl;
      });
    });
    this.grid = newGrid;
    this.update();
  }

  recalcGrid() {
    const grid = this.createEmptyGrid(this.rows, this.columns);

    const checkedGrid = grid.map((row, rowIndex) => {
      return row.map((col, colIndex) => {
        // if doesnt exist just retun 0
        if (!this.grid[rowIndex] || !this.grid[rowIndex][colIndex]) {
          return 0;
        }
        return this.grid[rowIndex][colIndex];
      });
    });
    return checkedGrid;
  }

  createEmptyGrid(rows, columns) {
    let grid = [];
    for (let r = 0; r < rows; r++) {
      grid[r] = [r];
      for (let c = 0; c < columns; c++) {
        grid[r][c] = 0;
      }
    }
    return grid;
  }

  fillStartGrid() {
    const firstFillers = [[0, 1], [0, 2], [0, 3], [2, 4], [3, 4], [4, 4]];

    firstFillers.map(filler => {
      const fillerRow = filler[0];
      const fillerCol = filler[1];

      this.grid[fillerRow][fillerCol] = 1;
    });
  }

  update() {
    this.clearGrid();
    this.drawGrid();
  }

  clearGrid() {
    this.ctx.clearRect(0, 0, this.canvasHeight, this.canvasWidth);
  }

  calcNeighbour(row, col) {
    const nextRow = this.getNextRow(row);
    const nextCol = this.getNextCol(col);
    return this.grid[nextRow][nextCol];
  }

  getNextRow(row) {
    if (row === -1) {
      return this.rows - 1;
    }
    if (row > this.rows - 1) {
      return 0;
    }
    return row;
  }

  getNextCol(column) {
    if (column === -1) {
      return this.columns - 1;
    }
    if (column > this.columns - 1) {
      return 0;
    }
    return column;
  }

  isAlive(totalNeighbours, alive) {
    if (alive) {
      // Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
      // Any live cell with more than three live neighbours dies, as if by overpopulation.
      if (totalNeighbours < 2 || totalNeighbours > 3) {
        return false;
      }
      // Any live cell with two or three live neighbours lives on to the next generation.
      if (totalNeighbours === 2 || totalNeighbours === 3) {
        return true;
      }
    } else {
      // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction
      return totalNeighbours === 3;
    }
  }

  calculateNextState() {
    return this.grid.reduce((list, row, rowIndex) => {
      const newRows = row.map((alive, colIndex) => {
        // all neighbours
        const topLeft = this.calcNeighbour(rowIndex - 1, colIndex - 1);
        const topCenter = this.calcNeighbour(rowIndex - 1, colIndex);
        const topRight = this.calcNeighbour(rowIndex - 1, colIndex + 1);
        const leftCenter = this.calcNeighbour(rowIndex, colIndex - 1);
        const rightCenter = this.calcNeighbour(rowIndex, colIndex + 1);
        const bottomLeft = this.calcNeighbour(rowIndex + 1, colIndex - 1);
        const bottomCenter = this.calcNeighbour(rowIndex + 1, colIndex);
        const bottomRight = this.calcNeighbour(rowIndex + 1, colIndex + 1);

        const totalNeighbours =
          topLeft +
          topCenter +
          topRight +
          leftCenter +
          rightCenter +
          bottomLeft +
          bottomCenter +
          bottomRight;

        return this.isAlive(totalNeighbours, alive) ? 1 : 0;
      });
      list.push(newRows);
      return list;
    }, []);
  }

  drawGrid() {
    for (let r = 0; r < this.grid.length; r++) {
      for (let c = 0; c < this.grid[r].length; c++) {
        const alive = this.grid[r][c];
        const color = alive ? '#FF0000' : '#FFFFFF';

        const x = c * this.rectSize;
        const y = r * this.rectSize;
        const width = this.rectSize;
        const height = this.rectSize;

        // order matters
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(x, y, width, height);

        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
      }
    }
  }
}

export default Game;
