// @flow
import FIXTURES from '../constants/fixture';

export function createEmptyGrid(rows, columns, value = 0) {
  const grid = [];
  for (let r = 0; r < rows; r++) {
    grid[r] = [r];
    for (let c = 0; c < columns; c++) {
      grid[r][c] = value;
    }
  }
  return grid;
}

export function createFixtureGrid(gridToFill) {
  const grid = gridToFill.map(row => row.concat(0));
  const firstFillers = FIXTURES;

  grid.forEach((row, rowI) =>
    row.forEach((col, colI) => {
      if (firstFillers[rowI] && firstFillers[rowI][colI]) {
        grid[rowI][colI] = firstFillers[rowI][colI];
      }
    }),
  );
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

  // console.table({ percentageX, percentageY, row, col });
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
    // console.log(index, list);
    return index - list;
  }
  return index;
}

// returns 0 or 1
function calcNeighbour(row, col, grid) {
  const nextRow = getNextCell(row, grid.length);
  const nextCol = getNextCell(col, grid[0].length);
  return Math.floor(grid[nextRow][nextCol]);
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
  if (alive === 1) {
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

export function calcPreset(rowIndex, colIndex, preset, grid) {
  // const rowIndex = rowX;
  // const colIndex = colX;

  const list = [];

  const calcedPresets = preset.forEach((rows, rowI) => {
    const nextRow = getNextCell(rowIndex + rowI, grid.length);

    const newRows = rows.map((col, colI) => {
      const nextCol = getNextCell(colIndex + colI, grid[0].length);
      //  console.log(nextRow, nextCol, 'value', col);
      // just fill a list with rows and cols need to hover
      list.push({
        row: nextRow,
        col: nextCol,
        value: col,
      });
      return col;
    });

    // rowIndex += 1;
    return newRows;
  });
  return list;

  // console.log(row, col, preset, grid);
}

// update empty grid with new filled grid
export function recalcGrid(emptyGrid, filledGrid) {
  const checkedGrid = emptyGrid.map((row, rowIndex) =>
    row.map((col, colIndex) => {
      // if doesnt exist just retun 0
      if (!filledGrid[rowIndex] || !filledGrid[rowIndex][colIndex]) {
        return 0;
      }
      return filledGrid[rowIndex][colIndex];
    }),
  );
  return checkedGrid;
}

export function calcTotalCells(cellSize: number, direction: string) {
  if (direction === 'horizontal') {
    return Math.floor(window.innerWidth / cellSize);
  }
  return Math.floor(window.innerHeight / cellSize);
}

export function calcSteps(steps) {
  const start = 0.8;
  const stepSize = start / steps;
  const list = [];

  for (let i = 0; i < steps; i++) {
    // /Math.round(num * 100) / 100
    const step = start - i * stepSize;
    const stepRounded = Math.round(step * 100) / 100;
    list.push(stepRounded);
  }

  return list;
}
