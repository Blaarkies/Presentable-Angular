import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AsciiImage, EntropyExample, JsonAsset} from "../../common/interface";
import {CompressionProcessorService} from "../compression-processor.service";
import {clone, getTextSplitByNumber, replaceAll, roundToDecimalPlace} from "../../common/utils";
import {animate, style, transition, trigger} from "@angular/animations";
import {TitleService} from "../../title.service";

@Component({
  selector: 'app-explanation',
  templateUrl: './compression-showcase.component.html',
  styleUrls: ['./compression-showcase.component.scss',
    '../../app.component.scss'],
})
export class CompressionShowcaseComponent implements OnInit {

  currentPage: number = 4;
  maxPage: number = 7;

  charLimit = 400;
  data: JsonAsset;

  constructor(private http: HttpClient,
              private compression: CompressionProcessorService,
              private titleService: TitleService) {
  }

  ngOnInit() {
    this.getPageName();

    this.http.get("assets/compression-data.json")
      .subscribe((data: JsonAsset) => this.data = data);
  }

  switchPage(forward: boolean) {
    if ((this.currentPage - 1 === 0 && !forward)
      || this.currentPage + 1 === this.maxPage + 1 && forward) {
      return;
    }

    if (forward) {
      this.currentPage++;
      this.getPageName();
      return;
    }
    this.currentPage--;
    this.getPageName();
  }

  getPageName() {
    this.titleService.titleChange$.next(
      [
        'Data and Information',
        'Data without pattern',
        'Run-length Encoding',
        'Huffman coding',
        'Huffman coding',
        'Lempel–Ziv–Welch',
        'Questions'
      ][this.currentPage - 1]
    );
  }

}
