import { Injectable } from '@angular/core';
import { getArrayRange, getArraySplitByNumber, getRandomFromArray, roundToDecimalPlace } from '../common/utils';
import { EntropyExample, FlaggedText, HuffmanCode } from '../common/interface';

@Injectable({
              providedIn: 'root'
            })
export class CompressionProcessorService {

  constructor() {
  }

  public getProcessedEntropy(data: EntropyExample, charLimit: number = data.text.length): EntropyExample {
    data.text = data.text.substring(0, charLimit);
    data.lines = data.text.split('\n');
    data.entropyScore = this.getEntropyScore(data.text);
    data.entropyFraction = roundToDecimalPlace(100 * data.entropyScore / data.text.length, 2);
    return data;
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
    let alphaNumericalList = this.getVisibleFontList();
    return getArrayRange(charLimit)
      .map((n, i) => {
        if (i && i % 50 === 0) {
          return String.fromCharCode(10);
        }
        if (Math.random() > 0.90) {
          return ' ';
        }
        return String.fromCharCode(getRandomFromArray(alphaNumericalList));
      })
      .join('');
  }

  getVisibleFontList() {
    return getArrayRange(256);
  }

  getRunLengthEncoded(text: string) {
    return text.split('')
               .reduce((sum, c, i) => {
                         let newestLineIndex = sum.length - 1;
                         let lastChar = sum[newestLineIndex].slice(-1);
                         if (lastChar === c || i === 0) {
                           sum[newestLineIndex] = sum[newestLineIndex] + c;
                         } else {
                           sum.push(c);
                         }
                         return sum;
                       },
                       ['']
               )
               .map(run => '' + run.length + run.slice(-1));
  }

  getRunLengthFlaggedEncoded(text: string) {
    let lastId = 0;
    return text.split('')
               .reduce((sum, c, i) => {
                         let newestLineIndex = sum.length - 1;
                         let lastChar = sum[newestLineIndex].slice(-1);
                         if (lastChar === c || i === 0) {
                           sum[newestLineIndex] = sum[newestLineIndex] + c;
                         } else {
                           sum.push(c);
                         }
                         return sum;
                       },
                       ['']
               )
               .map(run => ({
                 text: '' + run.length + run.slice(-1),
                 id: lastId++
               }));
  }

  getRunLengthFlagged(text: string): FlaggedText[] {
    let lastChar;
    let lastId = 0;
    return text.split('')
               .map(char => {
                 if (lastChar === undefined) {
                   lastChar = char;
                 }

                 if (char !== lastChar) {
                   lastChar = char;
                   return <FlaggedText>{
                     text: char,
                     id: ++lastId
                   };
                 }

                 return <FlaggedText>{
                   text: char,
                   id: lastId
                 } as FlaggedText;
               });
  }

  getRunLengthFlaggedAndSplit(text: string, width: number): FlaggedText[] {
    let flaggedText = this.getRunLengthFlagged(text);
    return getArraySplitByNumber(flaggedText, width);
  }

  getHuffmanTree(text: string): any[] {
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
    let tree = Object.keys(allFrequencies)
                     .map(k => ({
                       usages: allFrequencies[k],
                       index: k,
                       char: String.fromCharCode(Number.parseInt(k)),
                       insertOrder: undefined
                     }))
                     .sort((a, b) => a.index.localeCompare(b.index))
                     .sort((a, b) => a.usages - b.usages);

    getArrayRange(tree.length * 2)
      .forEach(i => {
        if (tree.length > 2) {
          tree = this.processBranch(tree, i);
        }
      });

    return tree;
  }

  public processBranch(tree, index): HuffmanCode[] {
    let char1 = tree[0];
    let char2 = tree[1];
    char1.insertOrder = index;
    char2.insertOrder = index;

    let node = {
      usages: char1.usages + char2.usages,
      1: char1,
      0: char2,
      index: `${char1.index} ${char2.index}`,
      char: `${char1.char} ${char2.char}`,
      insertOrder: index
    };

    tree.push(node);
    tree = tree
      .filter(n => n.index !== char1.index && n.index !== char2.index)
      .sort((a, b) => a.index.localeCompare(b.index))
      .sort((a, b) => a.usages - b.usages);

    return tree;
  }

  getHuffmanDictionary(tree: any): HuffmanCode[] {
    this.setPaths(tree);
    let dictionary: HuffmanCode[] = [];
    this.getEndNodes(tree, dictionary);
    return dictionary
      .sort((a, b) => a.index.localeCompare(b.index))
      .sort((a, b) => a.usages - b.usages);
  }

  getHuffmanEncoded(text: string, tree: any): string[] {
    let dictionary = this.getHuffmanDictionary(tree);

    return text.split('')
               .map(char => char.charCodeAt(0))
               .map(code =>
                      dictionary
                        .find(hc => hc.index === code.toString())
                        .path);
  }

  setPaths(tree: any, path: string = ''): any {
    let prop0 = tree[0];
    let prop1 = tree[1];

    tree.path = path;

    if (prop0 === undefined && prop1 === undefined) {
      return;
    }

    this.setPaths(prop0, path + '0');
    this.setPaths(prop1, path + '1');
  }

  getEndNodes(tree: any, list: any[]) {
    let prop0 = tree[0];
    let prop1 = tree[1];

    if (prop0 === undefined && prop1 === undefined) {
      list.push(tree);
      return;
    }

    this.getEndNodes(prop0, list);
    this.getEndNodes(prop1, list);
  }

  textToBinary(text: string): string {
    return text.split('')
               .map(char => char.charCodeAt(0)
                                .toString(2))
               .map(bin => bin.padStart(8, '0'))
               .map(bin => bin + ' ')
               .join('');
  }


  getLzwEncoded(text: string) {
    let dictionary = [];
    let lastCode = 255;
    let nowString = '';

    return text.split('')
               .map((char, i, a) => {
                 nowString += char;
                 let encodedWord = dictionary.find(e => e.string === nowString);

                 let next = a.slice(i + 1)[0];
                 if (next === undefined) {

                   return {
                     current: nowString,
                     next: '',
                     output: nowString,
                     add: '',
                     code: encodedWord ? encodedWord.code : nowString.charCodeAt(0)
                   };
                 }

                 let forward = nowString + next;
                 let entry = dictionary.find(e => e.string === forward);
                 if (entry) {
                   return {
                     current: nowString,
                     next: next,
                     output: '',
                     add: ''
                   };
                 }

                 let output = encodedWord ? encodedWord.string : nowString;
                 let nowStringClone = nowString;
                 if (output) {
                   nowString = '';
                 }

                 lastCode++;
                 let charToAdd = `${output}${next}`;
                 dictionary.push({
                                   string: charToAdd,
                                   code: lastCode
                                 });
                 let add = `${charToAdd}:${lastCode}`;

                 return {
                   current: nowStringClone,
                   next: next,
                   output: output,
                   add: add,
                   code: encodedWord ? encodedWord.code : output.charCodeAt(0)
                 };
               });
  }
}
