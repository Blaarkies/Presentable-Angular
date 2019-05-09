import { Component, OnInit } from '@angular/core';
import { EntropyExample } from 'src/app/common/interface';
import { CompressionProcessorService } from '../../compression-processor.service';
import { getLinesOfTextSplitByNumber, getUniqueElements, roundToDecimalPlace } from 'src/app/common/utils';
import { CompressionShowcaseService } from 'src/app/compression-crash-course/compression-showcase/compression-showcase.service';
import { ValueDisplayLines } from 'src/app/compression-crash-course/compression-showcase/page-data-without-pattern/value-display.lines';

@Component({
             selector: 'app-page-data-without-pattern',
             templateUrl: './page-data-without-pattern.component.html'
           })
export class PageDataWithoutPatternComponent implements OnInit {

  charLimit;

  highEntropyData: EntropyExample;
  charactersUsed: ValueDisplayLines = <ValueDisplayLines>{};
  asciiFraction: number;

  constructor(private dataService: CompressionShowcaseService,
              private compression: CompressionProcessorService) {
  }

  ngOnInit() {
    this.charLimit = this.dataService.charLimit;

    this.highEntropyData = {
      artist: 'Math',
      name: '.random()',
      text: this.compression.getHighEntropyText(this.charLimit)
    };

    this.charactersUsed.value = getUniqueElements(this.highEntropyData.text);
    this.charactersUsed.displayLines = getLinesOfTextSplitByNumber(this.charactersUsed.value
                                                                       .filter(c => c.charCodeAt(0) !== 10)
                                                                       .sort()
                                                                       .join(''), 30);

    this.asciiFraction = roundToDecimalPlace(this.charactersUsed.value.length / 256, 2) * 100;
  }

}
