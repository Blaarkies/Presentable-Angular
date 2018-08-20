import {Component, Input, OnInit} from '@angular/core';
import {EntropyExample} from "../../../common/interface";
import {replaceAll} from "../../../common/utils";
import {CompressionProcessorService} from "../../compression-processor.service";

@Component({
  selector: 'app-page-lempel-ziv-welch',
  templateUrl: './page-lempel-ziv-welch.component.html',
  styleUrls: ['./page-lempel-ziv-welch.component.scss',
    '../compression-showcase.component.scss']
})
export class PageLempelZivWelchComponent implements OnInit {

  @Input() set data(value: EntropyExample) {
    if (value) {
      this.initData(value);
    }
  }

  lzwEncoding: any = {};
  selectedLzwEntry = {};

  constructor(private compression: CompressionProcessorService) {
  }

  ngOnInit() {
  }

  initData(data: EntropyExample) {
    this.lzwEncoding.text = data.text.substring(49, 81).toLowerCase();
    this.lzwEncoding.text = replaceAll(this.lzwEncoding.text, ' ', '_');
    this.lzwEncoding = this.compression.getProcessedEntropy(this.lzwEncoding);
    this.lzwEncoding.textNumbers = this.lzwEncoding.text.split('').map(char => char.charCodeAt(0));
    this.lzwEncoding.notEncodedTransmission = this.lzwEncoding.textNumbers.join(' ');
    this.lzwEncoding.encodedTable = this.compression.getLzwEncoded(this.lzwEncoding.text);
    this.lzwEncoding.encodedTableFiltered = this.lzwEncoding.encodedTable.filter(e => e.output);
    this.lzwEncoding.encodedTransmission = this.lzwEncoding.encodedTableFiltered.map(e => e.code).join(' ');
  }

}
