import { Component, Input } from '@angular/core';
import { EntropyExample } from 'src/app/common/interfaces';
import { CompressionProcessorService } from '../compression-processor.service';
import { EncodedWord } from 'src/app/compression-crash-course/entropy-card/interfaces';

@Component({
             selector: 'app-entropy-card',
             templateUrl: './entropy-card.component.html',
             styleUrls: ['./entropy-card.component.scss']
           })
export class EntropyCardComponent {

  @Input() charLimit: number;

  @Input() set data(value: EntropyExample) {
    if (value) {
      this.datebook = this.compression.getProcessedEntropy(value, this.charLimit);
    }
  }

  encodedWords: EncodedWord[] = [];
  encodeMode = false;

  datebook: EntropyExample;

  constructor(private compression: CompressionProcessorService) {
  }

  selectWordToEncode(word: string): void {
    word = word.toLowerCase();

    if (this.encodedWords.some(ew => ew.normal === word)) {
      this.encodedWords = this.encodedWords
                              .filter(ew => ew.normal !== word)
                              .map((ew, i) => ({normal: ew.normal, encoded: i.toString()}));
      return;
    }

    this.encodedWords.push({
                             normal: word,
                             encoded: this.encodedWords.length.toString()
                           });
  }

  getEncoded(word: string): EncodedWord {
    return this.encodedWords.find(ew => ew.normal === word.toLowerCase());
  }

}
