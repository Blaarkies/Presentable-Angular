import { Component, OnInit } from '@angular/core';
import { clone, getArrayMax } from 'src/app/common/utils';
import { EntropyExample, HuffmanCode } from 'src/app/common/interfaces';
import { CompressionProcessorService } from '../../compression-processor.service';
import { BehaviorSubject } from 'rxjs';
import { CompressionShowcaseService } from '../compression-showcase.service';

@Component({
             selector: 'app-page-huffman-coding-tree',
             templateUrl: './page-huffman-coding-tree.component.html',
             styleUrls: ['./page-huffman-coding-tree.component.scss']
           })
export class PageHuffmanCodingTreeComponent implements OnInit {

  huffmanCoding: EntropyExample | any;
  tableDisplay: HuffmanCode[];
  minInsertOrder$ = new BehaviorSubject(Number.MAX_SAFE_INTEGER);
  lastData: EntropyExample;
  tableHoverIndex: number = undefined;
  selectedPath$ = new BehaviorSubject<string>('');

  constructor(private dataService: CompressionShowcaseService,
              private compression: CompressionProcessorService) {
  }

  ngOnInit() {
    this.dataService.data
        .subscribe(data => {
          this.initData(data.medium);
          this.lastData = data.medium;
        });
  }

  initData(data: EntropyExample) {
    this.huffmanCoding = this.dataService.getHuffmanCodingPageData(data);

    this.tableDisplay = clone(this.huffmanCoding.table);
    this.tableDisplay.forEach(hc => hc.insertOrder = undefined);

    this.minInsertOrder$.next(Number.MAX_SAFE_INTEGER);
  }

  listItemClicked(entry: HuffmanCode) {
    this.tableDisplay.reverse();

    // Process once for every pair of 2 elements below entry, and then also for entry itself
    let maxInsertOrder = getArrayMax(this.tableDisplay.map(hc => hc.insertOrder));

    let loopIdx = 0;
    while (this.tableDisplay.find(hc => entry.index === hc.index) && this.tableDisplay.length > 2) {
      this.tableDisplay = this.compression
                              .processBranch(this.tableDisplay, (maxInsertOrder !== undefined) ? (maxInsertOrder + loopIdx + 1) : loopIdx);
      loopIdx++;
    }

    this.tableDisplay.reverse();

    if (this.tableDisplay.length === 2) {
      this.minInsertOrder$.next(Number.MAX_SAFE_INTEGER);
      return;
    }
    this.minInsertOrder$.next(getArrayMax(this.tableDisplay.map(hc => hc.insertOrder)));
    this.tableHoverIndex = undefined;
  }

  resetTable() {
    this.initData(this.lastData);
    this.selectedPath$.next('');
  }

}
