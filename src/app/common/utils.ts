export function getSanitizedArray(array: number[]): any[] {
  return array.filter(i => !theUnsanitized.some(u => i === u));
}

let theUnsanitized = [undefined, null, Number.NaN];

export function getArrayMin(array: number[]): number {
  array = getSanitizedArray(array);
  if (array.length === 0) {
    return undefined;
  }
  return array.reduce((s, c) => (s < c) ? s : c);
}

export function getArrayMax(array: number[]): number {
  array = getSanitizedArray(array);
  if (array.length === 0) {
    return undefined;
  }
  return array.reduce((s, c) => (s > c) ? s : c);
}

export function getUniqueElements(obj: any): any[] {
  let list = isString(obj) ? obj.split('') : obj;

  return list.filter((c, i, a) => a.indexOf(c) === i);
}

export function isString(obj: any): obj is string {
  return (typeof obj === 'string' || obj instanceof String);
}

export function replaceAll(text: string, search: string, replacement: string) {
  return text.split(search).join(replacement);
}

export function clone(obj: any): any {
  return JSON.parse(JSON.stringify(obj));
}

export function getTextSplitByNumber(text: string, width: number) {
  return text
    .split('')
    .reduce((sum, c) => {
        let newestLineIndex = sum.length - 1;

        if (sum[newestLineIndex].length < width && c.charCodeAt(0) !== 10) {
          sum[newestLineIndex] += c;
        } else {
          sum.push(c);
        }
        return sum;
      },
      ['']
    );
}

export function getArraySplitByNumber(array: any[], width: number) {
  return array
    .reduce((sum, c) => {
        let newestLineIndex = sum.length - 1;

        if (sum[newestLineIndex].length < width) {
          sum[newestLineIndex].push(c);
        } else {
          sum.push([c]);
        }
        return sum;
      },
      [[]]
    );
}

export function roundToDecimalPlace(unrounded: number, decimalPlaces: number = 0) {
  let multiplier = Math.pow(10, decimalPlaces);
  return Math.round(multiplier * unrounded) / multiplier;
}

/***
 * Returns an array with one less level of nesting
 * @param array
 * @returns {Array}
 */
export function flatMap(array: any[]) {
  return array.reduce((acc, x) => acc.concat(x), []);
}

/***
 * Returns a random integer between 0(inclusive) and max(inclusive)
 * @param max
 * @returns {number}
 */
export function getRandomInteger(max: number = 9) {
  return Math.round(Math.random() * max);
}

/**
 * Returns an array that is filled with integers from 0(inclusive) to count(inclusive)
 * @param count
 * @returns {number[]}
 */
export function getArrayRange(count: number = 1) {
  return [...Array(count).keys()];
}

/**
 * Return a random element from a given array
 * @param array
 * @returns {*}
 */
export function getRandomFromArray(array: any[]) {
  return array[Math.floor((Math.random() * array.length))];
}
