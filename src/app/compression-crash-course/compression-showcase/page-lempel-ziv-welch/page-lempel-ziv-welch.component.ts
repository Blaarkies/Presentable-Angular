import { Component, OnInit } from '@angular/core';
import { EntropyExample } from 'src/app/common/interface';
import { replaceAll } from 'src/app/common/utils';
import { CompressionProcessorService } from '../../compression-processor.service';
import { CompressionShowcaseService } from 'src/app/compression-crash-course/compression-showcase/compression-showcase.service';

@Component({
             selector: 'app-page-lempel-ziv-welch',
             templateUrl: './page-lempel-ziv-welch.component.html',
             styleUrls: ['./page-lempel-ziv-welch.component.scss']
           })
export class PageLempelZivWelchComponent implements OnInit {

  lzwEncoding: any = {};
  selectedLzwEntry = {};

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
    this.lzwEncoding.notEncodedTransmission = this.lzwEncoding.text.split('')
                                                  .map(char => char.charCodeAt(0));
    this.lzwEncoding.encodedTable = this.compression.getLzwEncoded(this.lzwEncoding.text);
    this.lzwEncoding.encodedTableFiltered = this.lzwEncoding.encodedTable.filter(e => e.output);
    this.lzwEncoding.encodedTransmission = this.lzwEncoding.encodedTableFiltered.map(e => e.code)
                                               .join(' ');
  }

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
}
