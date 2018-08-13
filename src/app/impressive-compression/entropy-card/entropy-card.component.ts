import {Component, Input, OnInit} from '@angular/core';
import {EntropyExample} from "../../common/interface";

interface EncodedWord {
  normal: string;
  encoded: string;
}

@Component({
  selector: 'app-entropy-card',
  templateUrl: './entropy-card.component.html',
  styleUrls: ['./entropy-card.component.scss',
    '../../app.component.scss']
})
export class EntropyCardComponent implements OnInit {

  @Input('data') data: EntropyExample;
  @Input('charLimit') charLimit: number;

  encodedWords: EncodedWord[] = [];
  encodeMode = false;

  constructor() {
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
