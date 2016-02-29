export function findIndexById(id, data) {
  let i = 0, l = data.length, current;
  for (; i < l; i++) {
    if (data[i].id === id)
      return i;
  }
  return -1;
}