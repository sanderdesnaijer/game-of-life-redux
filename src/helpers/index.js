// @flow
import FIXTURES from '../constants/fixture';

export function createEmptyGrid(rows, columns, value = 0) {
  let grid = [];
  for (let r = 0; r < rows; r++) {
    grid[r] = [r];
    for (let c = 0; c < columns; c++) {
      grid[r][c] = value;
    }
  }
  return grid;
}

export function createFixtureGrid(gridToFill) {
  const grid = [...gridToFill];
  const firstFillers = FIXTURES;

  firstFillers.map(filler => {
    const fillerRow = filler[0];
    const fillerCol = filler[1];

    grid[fillerRow][fillerCol] = 1;
  });
  return grid;
}

export function calcPixelToGridPosition(
  x,
  y,
  totalColumns,
  totalRows,
  celSize,
) {
  const width = totalColumns * celSize;
  const height = totalRows * celSize;

  // col
  if (x > width || y > height) {
    return {
      row: null,
      col: null,
    };
  }
  const percentageX = x / width * totalColumns;
  const percentageY = y / height * totalRows;

  const col = Math.floor(percentageX);
  const row = Math.floor(percentageY);

  //console.table({ percentageX, percentageY, row, col });
  return {
    row,
    col,
  };
}

// place cells out of screen in opposite direction
function getNextCell(index, list) {
  if (index === -1) {
    return list - 1;
  }
  if (index > list - 1) {
    return 0;
  }
  return index;
}

// returns 0 or 1
function calcNeighbour(row, col, grid) {
  const nextRow = getNextCell(row, grid.length);
  const nextCol = getNextCell(col, grid[0].length);
  return grid[nextRow][nextCol];
}

// check every neighbours and calc score
export function calculateNextState(grid) {
  return grid.reduce((list, row, rowIndex) => {
    const newRows = row.map((alive, colIndex) => {
      // all neighbours
      const topLeft = calcNeighbour(rowIndex - 1, colIndex - 1, grid);
      const topCenter = calcNeighbour(rowIndex - 1, colIndex, grid);
      const topRight = calcNeighbour(rowIndex - 1, colIndex + 1, grid);
      const leftCenter = calcNeighbour(rowIndex, colIndex - 1, grid);
      const rightCenter = calcNeighbour(rowIndex, colIndex + 1, grid);
      const bottomLeft = calcNeighbour(rowIndex + 1, colIndex - 1, grid);
      const bottomCenter = calcNeighbour(rowIndex + 1, colIndex, grid);
      const bottomRight = calcNeighbour(rowIndex + 1, colIndex + 1, grid);

      const totalNeighbours =
        topLeft +
        topCenter +
        topRight +
        leftCenter +
        rightCenter +
        bottomLeft +
        bottomCenter +
        bottomRight;

      return isAlive(totalNeighbours, alive) ? 1 : 0;
    });
    list.push(newRows);
    return list;
  }, []);
}

// Game of Life rules
function isAlive(totalNeighbours, alive) {
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

// update empty grid with new filled grid
export function recalcGrid(emptyGrid, filledGrid) {
  const checkedGrid = emptyGrid.map((row, rowIndex) => {
    return row.map((col, colIndex) => {
      // if doesnt exist just retun 0
      if (!filledGrid[rowIndex] || !filledGrid[rowIndex][colIndex]) {
        return 0;
      }
      return filledGrid[rowIndex][colIndex];
    });
  });
  return checkedGrid;
}

export function isValidHex(hex: string) {
  return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(hex);
}

export function calcTotalCells(cellSize: number, direction: string) {
  if (direction === 'horizontal') {
    console.log(window.innerWidth, cellSize);
    return Math.floor(window.innerWidth / cellSize);
  }
  return Math.floor(window.innerHeight / cellSize);
}
