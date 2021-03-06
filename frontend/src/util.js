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


export const range = (n) => 
  Array.from(Array(n), (_,x) => x);

export const zip = function(ar1, ar2, zipper) {
    return zipper 
      ? ar1.map((value, index) => zipper(value, ar2[index]))
      : ar1.map((value, index) => [value, ar2[index]])
    ;
  }

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
, "Teadmata"
]

export const letterPattern = '[a-zA-ZüõöäÜÕÖÄžŽšŠ\\- ]*';

export const uniqueArr = (arr) => arr.filter((v, i, a) => a.indexOf(v) === i);

export const shallowCompare = (obj1, obj2) =>
  obj1 != null && obj2 != null &&
  Object.keys(obj1).length === Object.keys(obj2).length &&
  Object.keys(obj1).every(key => obj1[key] === obj2[key]);

export const b64EncodeUnicode = (str) => {
  // first we use encodeURIComponent to get percent-encoded UTF-8,
  // then we convert the percent encodings into raw bytes which
  // can be fed into btoa.
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
    function toSolidBytes(match, p1) {
      return String.fromCharCode('0x' + p1);
    }));
};

export const b64DecodeUnicode = (str) => {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(atob(str).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
};
