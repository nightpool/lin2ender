const pixel_size = 4;
export const width = 400 / pixel_size;
export const height = 400 / pixel_size;

const context = document.getElementById('main').getContext('2d', {
  desynchronized: true,
  alpha: false,
});

export const withColor = (color, func) => {
  const oldFill = context.fillStyle;
  context.fillStyle = color;
  func();
  context.fillStyle = oldFill;
}

export const clear = () => {
  withColor('white', () => context.fillRect(0, 0, width * pixel_size, height * pixel_size));
}

export const pixel = (x, y) => context.fillRect(
  x * pixel_size, y * pixel_size,
  pixel_size, pixel_size
);

clear();
