import {Injectable} from '@angular/core';
import {getArrayRange, getRandomFromArray} from "../common/utils";

@Injectable({
  providedIn: 'root'
})
export class CompressionProcessorService {

  constructor() {
  }

  /**
   * Returns the Information entropy value of a string, measured in bytes.
   * @param {string} text
   * @returns {number}
   */
  public getEntropyScore(text: string): number {
    let data = text.split('')
      .map(c => c.charCodeAt(0));

    let allFrequencies = {};
    data.forEach(d => {
      if (allFrequencies[d] === undefined) {
        allFrequencies[d] = 1;
      } else {
        allFrequencies[d]++;
      }
    });

    let allFrequenciesValues = Object.keys(allFrequencies)
      .map(k => allFrequencies[k]);

    let sumOfFrequencies = allFrequenciesValues
      .reduce((p, a) => p + a, 0);

    let bits = allFrequenciesValues.reduce((sum, v) => {
        let p = v / sumOfFrequencies;
        return sum - (p * Math.log(p) / Math.log(2));
      },
      0);

    return Math.ceil((bits * sumOfFrequencies) / 8);
  }

  getHighEntropyText(charLimit: number) {
    let alphaNumericalList = [].concat(
      getArrayRange(64).slice(32),
      getArrayRange(126).slice(90),
      getArrayRange(255).slice(191)
    );
    return getArrayRange(charLimit)
      .map((n, i) => {
        if (i && i % 50 === 0) {
          return String.fromCharCode(10);
        }
        if (Math.random() > 0.8) {
          return ' ';
        }
        return String.fromCharCode(getRandomFromArray(alphaNumericalList));
      })
      .join('');
  }
}
