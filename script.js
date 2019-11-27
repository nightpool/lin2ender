
let context = document.getElementById('main').getContext('2d', {
  desynchronized: true,
  alpha: false,
});
context.fillStyle = 'white';
context.fillRect(0, 0, 400, 400);

const pixel = (x, y) => context.fillRect(x * 8, y * 8, 8, 8);

let frame = 0;

const mainLoop = () => {

  frame++;
  requestAnimationFrame(mainLoop);

  if (frame % 2) {
    return;
  }

  context.fillStyle = 'white';
  context.fillRect(0, 0, 400, 400);
  context.fillStyle = 'black';

  pixel(5 + Math.abs(40 - frame/2 % 80), 10);
  pixel(5 + Math.abs(40 - frame/2.5 % 80), 5 + Math.abs(40 - frame/2.5 % 80));
  pixel(45 - Math.abs(40 - frame/5 % 80), 5 + Math.abs(40 - frame/5 % 80));
  pixel(45 - Math.abs(40 - frame/2 % 80), 40);
}


requestAnimationFrame(mainLoop);
