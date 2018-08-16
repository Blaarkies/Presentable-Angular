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
  // animations: [
  //   trigger('visibilityChanged', [
  //     transition(':enter', [
  //       style({opacity: 0, transform: 'translateX(-400px)'}),
  //       animate(6, style({opacity: 1, transform: 'translateX(0)'}))
  //     ]),
  //     transition(':leave', [
  //       style({opacity: 1, transform: 'translateX(0)'}),
  //       animate(6, style({opacity: 0, transform: 'translateX(-400px)'}))
  //     ])
  //   ])
  // ]
})
export class CompressionShowcaseComponent implements OnInit {

  currentPage: number = 4;
  maxPage: number = 7;

  charLimit = 400;
  lowEntropy: EntropyExample = this.newEntropy();
  mediumEntropy: EntropyExample = this.newEntropy();
  highEntropy: EntropyExample = this.newEntropy();

  runLengthImage: AsciiImage = this.newAsciiImage();

  huffmanCoding: EntropyExample | any = this.newEntropy();

  lzwEncoding: any = {};
  selectedHuffmanCode: string;
  selectedRunLengthId: number;
  selectedLzwEntry = {};

  constructor(private http: HttpClient,
              private compression: CompressionProcessorService,
              private titleService: TitleService) {
  }

  ngOnInit() {
    this.getPageName();

    this.http.get("assets/compression-data.json")
      .subscribe((data: JsonAsset) => {
        this.lowEntropy = this.getProcessedEntropy(data.low);
        this.mediumEntropy = this.getProcessedEntropy(data.medium);
        this.runLengthImage = this.getRunLengthEncoding(data.asciiImage);

        this.huffmanCoding = clone(this.mediumEntropy);
        this.huffmanCoding.text = this.huffmanCoding.text.substring(0, 96);
        this.huffmanCoding.binary = this.compression.textToBinary(this.huffmanCoding.text);
        this.huffmanCoding.binary = getTextSplitByNumber(this.huffmanCoding.binary, 40 + 5);
        this.huffmanCoding = this.getProcessedEntropy(this.huffmanCoding);
        this.huffmanCoding.tree = this.compression.getHuffmanTree(this.huffmanCoding.text.toLowerCase());
        this.huffmanCoding.encodedArray = this.compression.getHuffmanEncoded(this.huffmanCoding.text.toLowerCase(), this.huffmanCoding.tree);
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

        this.lzwEncoding.text = data.low.text.substring(49, 81).toLowerCase();
        this.lzwEncoding.text = replaceAll(this.lzwEncoding.text, ' ', '_');
        this.lzwEncoding = this.getProcessedEntropy(this.lzwEncoding);
        this.lzwEncoding.textNumbers = this.lzwEncoding.text.split('').map(char => char.charCodeAt(0));
        this.lzwEncoding.encodedTable = this.compression.getLzwEncoded(this.lzwEncoding.text);
        this.lzwEncoding.encodedTableFiltered = this.lzwEncoding.encodedTable.filter(e => e.output);
      });

    this.highEntropy = {
      artist: 'Math',
      name: '.random()',
      text: this.compression.getHighEntropyText(this.charLimit)
    };
    this.highEntropy = this.getProcessedEntropy(this.highEntropy);
    this.highEntropy.charsUsed = this.compression.getVisibleFontList()
      .map(vf => String.fromCharCode(vf));
    this.highEntropy.charsUsedLength = this.highEntropy.charsUsed.length;
    this.highEntropy.asciiFraction = roundToDecimalPlace(this.highEntropy.charsUsed.length / 256, 2) * 100;
    this.highEntropy.charsUsed = getTextSplitByNumber(this.highEntropy.charsUsed.join(''), 50);
  }

  getRunLengthEncoding(image: AsciiImage): AsciiImage {
    image.lines = this.compression.getRunLengthFlaggedAndSplit(image.text, image.width);
    image.encoded = this.compression.getRunLengthFlaggedEncoded(image.text);
    image.entropyScore = this.compression.getEntropyScore(image.text.slice(0, this.charLimit));
    image.entropyFraction = roundToDecimalPlace(100 * image.entropyScore / this.charLimit, 2);
    return image;
  }

  newEntropy(): EntropyExample {
    return {
      text: '',
      artist: '',
      name: '',
    };
  }

  newAsciiImage(): AsciiImage {
    return {
      text: '',
      width: 0
    };
  }

  getProcessedEntropy(data: EntropyExample): EntropyExample {
    data.lines = data.text.substring(0, this.charLimit).split('\n');
    let dataAmount = data.lines.reduce((sum, c) => sum + c.length, 0);
    data.entropyScore = this.compression.getEntropyScore(data.text.slice(0, this.charLimit));
    data.entropyFraction = roundToDecimalPlace(100 * data.entropyScore / dataAmount, 2);
    return data;
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
        'Data vs Information',
        'Patternless Data',
        'Run-length Encoding',
        'Huffman coding',
        'Huffman coding',
        'LZW - Lempel–Ziv–Welch',
        'Questions'
      ][this.currentPage - 1]
    );
  }

}
