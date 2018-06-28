import {Injectable} from '@angular/core';

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

    return Math.ceil(bits * sumOfFrequencies / 8);
  }


}
