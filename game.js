import {range, any} from './util.js';
import {pixel, width, height, withColor} from './canvas.js';
import {end} from './script.js';
import {eat as playEat, tele as playTele} from './audio.js';

const board = range(width).map(() => range(height).map(() => false));
range(height).map(y => {
  board[50][y] = true;
  board[70][y] = true;
});

const fruit = range(3).map(randCell);

let position  = [4, 5];
let direction = [1, 0];
let nextDirection = undefined;

addEventListener('keydown', event => {
  const directionFromKeypress = ({
    ArrowUp:    [0, -1],
    ArrowDown:  [0, 1],
    ArrowLeft:  [-1, 0],
    ArrowRight: [1, 0],
  })[event.key];

  if (directionFromKeypress && !isInverseOf(direction, directionFromKeypress)) {
    nextDirection = directionFromKeypress;
  }
});

export const game = () => {
  if (nextDirection) {
    direction = nextDirection;
    nextDirection = undefined;
  }

  const fruitsCells = fruit.map(cellsForFruit);
  fruitsCells.forEach((fruitCells, i) => {
    if (any(fruitCells, p => posEquals(p, position))) {
      playEat();
      fruit.splice(i, 1, randCell());
      window.score.textContent = Number(window.score.textContent) + 1;
    }
  });

  const [x, y] = position;
  const [dx, dy] = direction;
  let [nextX, nextY] = [x + dx, y + dy];

  if (board[nextX] && board[nextX][nextY]) {
    playTele();
    [nextX, nextY] = findNextWall([nextX, nextY], direction);
  }

  if (outOfBounds(nextX, nextY)) {
    end();
    return end;
  }

  board[nextX][nextY] = true;
  position = [nextX, nextY];

  paintBoard();

  withColor('#22ff22', () => {
    fruitsCells.forEach(f => f.forEach(([x, y]) => pixel(x, y)));
  })
}

export const paintBoard = () => {
  board.forEach((row, x) => row.forEach((item, y) => item && pixel(x, y)));
}

const posEquals = (pos, other) => pos[0] === other[0] && pos[1] == other[1];
const outOfBounds = (x, y) =>
  (x < 0 || y < 0 || x >= width || y >= height);

const findNextWall = ([x, y], [dx, dy]) => {
  do {
    [x, y] = [x + dx, y + dy];
  } while (!outOfBounds(x, y) && !board[x][y])

  return [x, y];
}

const fruitTemplate = [
            [-1,  2], [0,  2], [1,  2],
  [-2,  1], [-1,  1], [0,  1], [1,  1], [2,  1],
  [-2,  0], [-1,  0], [0,  0], [1,  0], [2,  0],
  [-2, -1], [-1, -1], [0, -1], [1, -1], [2, -1],
            [-1, -2], [0, -2], [1, -2],
]
const cellsForFruit = ([x, y]) => fruitTemplate.map(([dx, dy]) => [dx + x, dy + y]);

const isInverseOf = (dir, other) =>
  (dir[0] == other[0]) ^ (dir[1] == other[1]);

function randCell() {
  return [Math.floor(Math.random() * width), Math.floor(Math.random() * height)];
}
