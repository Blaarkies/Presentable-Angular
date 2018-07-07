





export function getTextSplitByNumberOfCharacter(text: string, width: number) {
  return text
    .split('')
    .reduce((sum, c) => {
        let newestLineIndex = sum.findIndex(line => line.length < width);

        if (newestLineIndex > -1) {
          sum[newestLineIndex] = sum[newestLineIndex] + c;
        } else {
          sum.push(c);
        }
        return sum;
      },
      ['']
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
  return Array.from({length: count}, (v, i) => i);
}

/**
 * Return a random element from a given array
 * @param array
 * @returns {*}
 */
export function getRandomFromArray(array: any[]) {
  return array[Math.floor((Math.random() * array.length))];
}
