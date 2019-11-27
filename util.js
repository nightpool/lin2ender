export const range = n => [...Array(n)].map((_, i) => i);
export const any = (list, func = (x => x)) => {
  for (let i = 0; i < list.length; i++) {
    if (func(list[i])) {
      return true;
    }
  }
  return false;
}
