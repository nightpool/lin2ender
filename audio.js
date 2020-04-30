const audio = url => {
  const node = new Audio(url);
  return () => node.cloneNode().play();
}

export const eat = audio('audio/eat_.mp3');
export const tele = audio('audio/tele.mp3');
