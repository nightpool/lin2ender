const pixelSize = 4;
export const width = 400 / pixelSize;
export const height = 400 / pixelSize;

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
  withColor('white', () => fill(0, 0, width, height));
}

export const pixel = (x, y) => context.fillRect(
  x * pixelSize, y * pixelSize,
  pixelSize, pixelSize
);

export const fill = (x, y, width, height) => context.fillRect(
  x * pixelSize, y * pixelSize,
  width * pixelSize, height * pixelSize
);

clear();
