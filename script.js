import {height, width, withColor, clear, text, fontReady} from './canvas.js';
import {game, paintBoard} from './game.js';

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
    if (next.init) { next.init(); }
    state = next;
  }
}
requestAnimationFrame(mainLoop);

export function end() {
  withColor('red', paintBoard);
  if (space) {
    space = false;
    return game;
  }
}
end.init = end;

let space = false;
export function start() {
  if (fontReady) {
    text(width / 2, height / 2, "press space")
  }
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
