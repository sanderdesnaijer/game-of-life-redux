export default [
  {
    id: 'preset-1',
    name: 'glider',
    grid: [[0, 1, 0], [0, 0, 1], [1, 1, 1]],
  },
  {
    id: 'preset-2',
    name: 'half circle',
    grid: [
      [1, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
      [0, 0, 0, 1],
      [0, 0, 0, 1],
      [0, 0, 1, 0],
      [1, 1, 0, 0],
    ],
  },
  {
    id: 'preset-3',
    name: 'lighweight spaceship',
    grid: [[0, 1, 0, 0, 1], [1, 0, 0, 0, 0], [1, 0, 0, 0, 1], [1, 1, 1, 1, 0]],
  },
  {
    id: 'preset-4',
    name: 'beacon',
    grid: [[1, 1, 0, 0], [1, 0, 0, 0], [0, 0, 0, 1], [0, 0, 1, 1]],
  },
];
