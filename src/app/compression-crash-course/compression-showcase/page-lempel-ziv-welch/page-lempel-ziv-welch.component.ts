import { Component, OnInit } from '@angular/core';
import { EntropyExample, LzwContainer, SelectedEntry } from 'src/app/common/interface';
import { replaceAll, roundToDecimalPlace } from 'src/app/common/utils';
import { CompressionProcessorService } from '../../compression-processor.service';
import { CompressionShowcaseService } from 'src/app/compression-crash-course/compression-showcase/compression-showcase.service';

@Component({
             selector: 'app-page-lempel-ziv-welch',
             templateUrl: './page-lempel-ziv-welch.component.html',
             styleUrls: ['./page-lempel-ziv-welch.component.scss']
           })
export class PageLempelZivWelchComponent implements OnInit {

  lzwEncoding: any = {};
  selectedLzwEntry: SelectedEntry = <SelectedEntry>{};
  encodedEntropyInfo: EntropyExample;
  currentIndex: number = 0;
  currentCharacter: LzwContainer = <LzwContainer>{};

  constructor(private dataService: CompressionShowcaseService,
              private compression: CompressionProcessorService) {
  }

  ngOnInit() {
    this.dataService.data.subscribe(data => this.initData(data.low));
  }

  initData(data: EntropyExample) {
    this.lzwEncoding.text = data.text.substring(49, 81)
                                .toLowerCase();
    this.lzwEncoding.text = replaceAll(this.lzwEncoding.text, ' ', '_');
    this.lzwEncoding = this.compression.getProcessedEntropy(this.lzwEncoding);
    this.lzwEncoding.normalTransmission = this.lzwEncoding.text.split('')
                                              .map(char => char.charCodeAt(0));
    this.lzwEncoding.encodedTable = this.compression.getLzwEncoded(this.lzwEncoding.text);
    this.lzwEncoding.encodedTableFiltered = this.lzwEncoding.encodedTable.filter(e => e.output);
    this.lzwEncoding.encodedTransmission = this.lzwEncoding.encodedTableFiltered.map(e => e.code);
    this.lzwEncoding.normalPayloadSize = this.lzwEncoding.normalTransmission.length;
    this.lzwEncoding.encodedPayloadSize = roundToDecimalPlace(
      (this.lzwEncoding.encodedTransmission.length * 9) / 8, 2);
    this.encodedEntropyInfo = <EntropyExample>{
      text: this.lzwEncoding.encodedTransmission
                .map(() => '0')
                .join(''),
      entropyScore: this.compression.getEntropyScore(this.lzwEncoding.encodedTransmission)
    };
    this.encodedEntropyInfo.entropyFraction = roundToDecimalPlace(100
                                                                    * this.encodedEntropyInfo.entropyScore / this.encodedEntropyInfo.text.length,
                                                                  2);

    this.lzwEncoding.encodedTable
        .forEach(lzw => lzw.dictionary.splice(lzw.dictionary.length - 1, 1));

    this.setCurrentCharacter();
  };

  private setCurrentCharacter() {
    this.currentCharacter = this.lzwEncoding.encodedTable[this.currentIndex];
  }

  setSelectedLzwEntry() {
    let row = this.currentCharacter;
    let idx = this.lzwEncoding.encodedTable.indexOf(row);

    this.selectedLzwEntry = {
      code: row.code ? row.code.toString() : '',
      next: row.next,
      char: row.current,
      idxStart: idx - row.current.length + 1,
      idxEnd: idx,
      output: row.output
    };
  }

  getIsSelectedNormalTransmission(idx: number) {
    return idx >= this.selectedLzwEntry.idxStart
      && idx <= this.selectedLzwEntry.idxEnd
      && this.selectedLzwEntry.char;
  }

  getIsSelectedEncodedTransmission(encodedElement) {
    return this.selectedLzwEntry.code == encodedElement.code
      && this.selectedLzwEntry.next == encodedElement.next;
  }

  isDictionaryMatch(stringToMatch: string): boolean {
    return (this.selectedLzwEntry.char + this.selectedLzwEntry.next) == stringToMatch;
  }

  stepToNextCharacter() {
    this.currentIndex = (this.currentIndex >= this.lzwEncoding.encodedTable.length - 1) ? 0 : this.currentIndex + 1;
    this.setCurrentCharacter();
    this.setSelectedLzwEntry();
  }

  resetCharacter() {
    this.currentIndex = 0;
    this.setCurrentCharacter();
    this.setSelectedLzwEntry();
  }

}
