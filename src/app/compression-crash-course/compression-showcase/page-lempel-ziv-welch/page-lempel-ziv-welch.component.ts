import { Component, OnInit } from '@angular/core';
import { EntropyExample } from 'src/app/common/interface';
import { replaceAll, roundToDecimalPlace } from 'src/app/common/utils';
import { CompressionProcessorService } from '../../compression-processor.service';
import { CompressionShowcaseService } from 'src/app/compression-crash-course/compression-showcase/compression-showcase.service';

interface SelectedEntry {
  code: string;
  next: string;
  char: string;
  idxStart: number;
  idxEnd: number;
  output: string;
}

@Component({
             selector: 'app-page-lempel-ziv-welch',
             templateUrl: './page-lempel-ziv-welch.component.html',
             styleUrls: ['./page-lempel-ziv-welch.component.scss']
           })
export class PageLempelZivWelchComponent implements OnInit {

  lzwEncoding: any = {};
  selectedLzwEntry: SelectedEntry = <SelectedEntry>{};
  encodedEntropyInfo: EntropyExample;

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
      * this.encodedEntropyInfo.entropyScore / this.encodedEntropyInfo.text.length, 2);
  };

  setSelectedLzwEntry(row, idx: number) {
    this.selectedLzwEntry = {
      code: row.code,
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
      && this.selectedLzwEntry.output;
  }

  getIsSelectedEncodedTransmission(encodedElement) {
    return this.selectedLzwEntry.code == encodedElement.code
      && this.selectedLzwEntry.next == encodedElement.next;
  }
}
