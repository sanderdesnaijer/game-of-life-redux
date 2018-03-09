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
  const firstFillers = [[0, 1], [0, 2], [0, 3], [2, 4], [3, 4], [4, 4]];

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
  celSize
) {
  const width = totalColumns * celSize;
  const height = totalRows * celSize;

  // col
  if (x > width || y > height) {
    return {
      row: null,
      col: null
    };
  }
  const percentageX = x / width * totalColumns;
  const percentageY = y / height * totalRows;

  const col = Math.floor(percentageX);
  const row = Math.floor(percentageY);

  console.table({ percentageX, percentageY, row, col });

  return {
    row,
    col
  };
}
