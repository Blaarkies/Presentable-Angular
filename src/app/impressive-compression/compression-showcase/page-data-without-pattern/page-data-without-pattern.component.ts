import {Component, Input, OnInit} from '@angular/core';
import {EntropyExample} from "../../../common/interface";
import {CompressionProcessorService} from "../../compression-processor.service";
import {getTextSplitByNumber, getUniqueElements, roundToDecimalPlace} from "../../../common/utils";

interface ValueDisplayLines {
  value: any;
  displayLines: string[];
}

@Component({
  selector: 'app-page-data-without-pattern',
  templateUrl: './page-data-without-pattern.component.html',
  styleUrls: ['../compression-showcase.component.scss']
})
export class PageDataWithoutPatternComponent implements OnInit {

  @Input() charLimit;

  highEntropyData: EntropyExample;
  charactersUsed: ValueDisplayLines = <ValueDisplayLines>{};
  asciiFraction: number;

  constructor(private compression: CompressionProcessorService) {
  }

  ngOnInit() {
    this.highEntropyData = {
      artist: 'Math',
      name: '.random()',
      text: this.compression.getHighEntropyText(this.charLimit)
    };

    this.charactersUsed.value = getUniqueElements(this.highEntropyData.text);
    this.charactersUsed.displayLines = getTextSplitByNumber(this.charactersUsed.value.join(''), 50);

    this.asciiFraction = roundToDecimalPlace(this.charactersUsed.value.length / 256, 2) * 100;
  }

}
