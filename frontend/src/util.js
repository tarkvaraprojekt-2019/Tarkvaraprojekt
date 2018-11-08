export function sampleSize(array, n) {
  return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
}
export function baseRandom(lower, upper) {
  return lower + Math.floor(Math.random() * (upper - lower + 1));
}
export function baseClamp(number, lower, upper) {
  if (number === number) {
    if (upper !== undefined) {
      number = number <= upper ? number : upper;
    }
    if (lower !== undefined) {
      number = number >= lower ? number : lower;
    }
  }
  return number;
}
export function copyArray(source, array) {
  var index = -1,
    length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

export function shuffleSelf(array, size) {
  var index = -1,
    length = array.length,
    lastIndex = length - 1;

  size = size === undefined ? length : size;
  while (++index < size) {
    var rand = baseRandom(index, lastIndex),
      value = array[rand];

    array[rand] = array[index];
    array[index] = value;
  }
  array.length = size;
  return array;
}

export const sumNames = (a, b) => a + ' ' + b;
export const zipWith = (f, xs, ys) =>
  Array(xs.length)
    .fill('')
    .map((v, i) => f(xs[i], ys[i]));

export const zipWith3 = (f, xs, ys, zs) =>
  Array(xs.length)
    .fill('')
    .map((v, i) => f(xs[i], ys[i], zs[i]));


export const piirkonnad = [
  "Tartumaa"
, "Harjumaa"
, "Pärnumaa"
, "Saaremaa"
, "Hiiumaa"
, "Võrumaa"
, "Ida-Virumaa"
, "Lääne-Virumaa"
, "Põlvamaa"
, "Viljandimaa"
, "Raplamaa"
, "Jõgevamaa"
, "Läänemaa"
, "Järvamaa"
, "Valgamaa"
]


