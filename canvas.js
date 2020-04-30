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

export const withFont = (font, func) => {
  const oldfont = context.font;
  context.font = font;
  func();
  context.font = oldfont;
}

export const clear = () => {
  withColor('white', () => fill(0, 0, width, height));
}

export const text = (x, y, text) => {
  withColor('black',
    () => withFont("500 2rem 'IBM Plex Mono'",
    () => context.fillText(text, x * pixelSize, y * pixelSize)));
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
