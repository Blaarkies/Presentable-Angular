import {Component, Input, OnInit} from '@angular/core';
import {clone, getArrayMax, getTextSplitByNumber} from "../../../common/utils";
import {EntropyExample, HuffmanCode} from "../../../common/interface";
import {CompressionProcessorService} from "../../compression-processor.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-page-huffman-coding-tree',
  templateUrl: './page-huffman-coding-tree.component.html',
  styleUrls: ['./page-huffman-coding-tree.component.scss']
})
export class PageHuffmanCodingTreeComponent implements OnInit {

  @Input() set data(value: EntropyExample) {
    if (value) {
      this.initData(value);
      this.lastData = value;
    }
  }

  huffmanCoding: EntropyExample | any;
  tableDisplay: HuffmanCode[];
  minInsertOrder$ = new BehaviorSubject(Number.MAX_SAFE_INTEGER);
  lastData: EntropyExample;
  tableHoverIndex: number = undefined;

  constructor(private compression: CompressionProcessorService) {
  }
// TODO: bit-code path on digits when clicking on a character
  ngOnInit() {
  }

  initData(data: EntropyExample) {
    this.huffmanCoding = clone(this.compression.getProcessedEntropy(data));
    this.huffmanCoding.text = this.huffmanCoding.text.substring(0, 96);
    this.huffmanCoding.binary = this.compression.textToBinary(this.huffmanCoding.text);
    this.huffmanCoding.binary = getTextSplitByNumber(this.huffmanCoding.binary, 40 + 5);

    this.huffmanCoding = this.compression.getProcessedEntropy(this.huffmanCoding);
    this.huffmanCoding.tree = this.compression.getHuffmanTree(this.huffmanCoding.text.toLowerCase());
    this.huffmanCoding.encodedArray = this.compression.getHuffmanEncoded(this.huffmanCoding.text.toLowerCase(),
      this.huffmanCoding.tree);
    this.huffmanCoding.table = this.compression.getHuffmanDictionary(this.huffmanCoding.tree)
      .map(hc => {
        if (hc.char === ' ') {
          hc.char = '⎵';
        }
        if (hc.index === '10') {
          hc.char = '¶'; // this could influence the sorting in compression processor
        }
        return hc;
      });
    this.huffmanCoding.lines = getTextSplitByNumber(this.huffmanCoding.text, 60);

    this.tableDisplay = clone(this.huffmanCoding.table.reverse());
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
  }

}
