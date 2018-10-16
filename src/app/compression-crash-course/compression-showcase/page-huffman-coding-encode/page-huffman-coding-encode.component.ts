import { Component, OnInit } from '@angular/core';
import { EntropyExample } from 'src/app/common/interface';
import { CompressionShowcaseService } from '../compression-showcase.service';
import { getArrayRange } from 'src/app/common/utils';
import { TitleService } from 'src/app/title.service';

@Component({
             selector: 'app-page-huffman-coding-encode',
             templateUrl: './page-huffman-coding-encode.component.html',
             styleUrls: ['./page-huffman-coding-encode.component.scss']
           })
export class PageHuffmanCodingEncodeComponent implements OnInit {

  huffmanCoding: EntropyExample | any;
  selectedChar: string;
  decodedFlags: boolean[] = [];
  dictionary = {};

  isPresentation = false;

  constructor(private dataService: CompressionShowcaseService,
              private titleService: TitleService) {
    this.isPresentation = this.titleService.isPresentation;
  }

  ngOnInit() {
    this.dataService.data.subscribe(data => this.initData(data.medium));
  }

  initData(data: EntropyExample) {
    this.huffmanCoding = this.dataService.getHuffmanCodingPageData(data);
    this.huffmanCoding
        .table
        .forEach(hc => this.dictionary[hc.path] = hc.char);
  }

  getWhiteSpace(code: string) {
    return getArrayRange(code.length - 1)
      .map(() => ' ')
      .join('');
  }

  resetDecodings() {
    this.decodedFlags = [];
  }
}
