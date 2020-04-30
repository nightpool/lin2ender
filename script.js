import {withColor, clear, text} from './canvas.js';
import {game, paintBoard} from './game.js'

let state = start;
let frame = 0;
const mainLoop = () => {
  requestAnimationFrame(mainLoop);

  frame++;
  if (frame % 2) {
    return;
  }

  clear();

  const next = state();
  if (next) {
    state = next;
  }
}
requestAnimationFrame(mainLoop);

export function end() {
  withColor('red', paintBoard);
}

let space = false;
export function start() {
  text(10, 10, "press space")
  if (space) {
    space = false;
    return game;
  }
}
addEventListener('keydown', ({key}) => {
  if (key === ' ') {
    space = true;
  }
});
