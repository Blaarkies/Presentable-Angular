import {Component, Input, OnInit} from '@angular/core';
import {EntropyExample} from "../../../common/interface";
import {CompressionProcessorService} from "../../compression-processor.service";
import {clone, getTextSplitByNumber} from "../../../common/utils";

@Component({
  selector: 'app-page-huffman-coding-encode',
  templateUrl: './page-huffman-coding-encode.component.html',
  styleUrls: ['./page-huffman-coding-encode.component.scss',
    '../compression-showcase.component.scss']
})
export class PageHuffmanCodingEncodeComponent implements OnInit {

  @Input() set data(value: EntropyExample) {
    if (value) {
      this.initData(value);
    }
  }

  huffmanCoding: EntropyExample | any;
  selectedHuffmanCode: string;

  constructor(private compression: CompressionProcessorService) {
  }

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
          hc.char = 'space';
        }
        if (hc.index === '10') {
          hc.char = 'cr';
        }
        return hc;
      });
    this.huffmanCoding.lines = getTextSplitByNumber(this.huffmanCoding.text, 60);
  }

}
