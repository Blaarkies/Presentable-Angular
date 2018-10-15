import { Component, Input, OnInit } from '@angular/core';
import { EntropyExample } from '../../common/interface';
import { CompressionProcessorService } from '../compression-processor.service';

// TODO: move!
interface EncodedWord {
  normal: string;
  encoded: string;
}

@Component({
             selector: 'app-entropy-card',
             templateUrl: './entropy-card.component.html',
             styleUrls: ['./entropy-card.component.scss']
           })
export class EntropyCardComponent implements OnInit {

  @Input() charLimit: number;

  @Input() set data(value: EntropyExample) {
    if (value) {
      this.datebook = this.compression.getProcessedEntropy(value, this.charLimit);
    }
  }

  encodedWords: EncodedWord[] = [];
  encodeMode = false;

  datebook: EntropyExample;

  isPresentation = false;

  constructor(private compression: CompressionProcessorService) {
  }

  ngOnInit() {
  }

  selectWordToEncode(word: string) {
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

  getEncoded(word: string) {
    return this.encodedWords.find(ew => ew.normal === word.toLowerCase());
  }

}
