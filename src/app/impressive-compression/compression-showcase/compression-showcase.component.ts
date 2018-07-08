import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AsciiImage, EntropyExample, JsonAsset} from "../../common/interface";
import {CompressionProcessorService} from "../compression-processor.service";
import {clone, getTextSplitByNumberOfCharacter, replaceAll, roundToDecimalPlace} from "../../common/utils";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-explanation',
  templateUrl: './compression-showcase.component.html',
  styleUrls: ['./compression-showcase.component.css',
    '../../app.component.scss'],
  animations: [
    trigger('visibilityChanged', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateX(-400px)'}),
        animate(600, style({opacity: 1, transform: 'translateX(0)'}))
      ]),
      transition(':leave', [
        style({opacity: 1, transform: 'translateX(0)'}),
        animate(600, style({opacity: 0, transform: 'translateX(-400px)'}))
      ])
    ])
  ]
})
export class CompressionShowcaseComponent implements OnInit {

  currentPage: number = 5;
  private maxPage: number = 6;

  charLimit = 400;
  lowEntropy: EntropyExample = this.newEntropy();
  mediumEntropy: EntropyExample = this.newEntropy();
  highEntropy: EntropyExample = this.newEntropy();

  runLengthImage: AsciiImage = this.newAsciiImage();

  huffmanCoding: EntropyExample | any = this.newEntropy();

  lzwEncoding: any = {};
  selectedHuffmanCode: string;
  selectedRunLengthCode: string;

  constructor(private http: HttpClient,
              private compression: CompressionProcessorService) {
  }

  ngOnInit() {
    this.http.get("assets/compression-data.json")
      .subscribe((data: JsonAsset) => {
        this.lowEntropy = this.getProcessedEntropy(data.low);
        this.mediumEntropy = this.getProcessedEntropy(data.medium);
        this.runLengthImage = this.getRunLengthEncoding(data.asciiImage);

        this.huffmanCoding = clone(this.mediumEntropy);
        this.huffmanCoding.text = this.huffmanCoding.text.substring(0, 96);
        this.huffmanCoding.binary = this.compression.textToBinary(this.huffmanCoding.text);
        this.huffmanCoding.binary = getTextSplitByNumberOfCharacter(this.huffmanCoding.binary, 40 + 5);
        this.huffmanCoding = this.getProcessedEntropy(this.huffmanCoding);
        this.huffmanCoding.tree = this.compression.getHuffmanTree(this.huffmanCoding.text.toLowerCase());
        this.huffmanCoding.encodedArray = this.compression.getHuffmanEncoded(this.huffmanCoding.text.toLowerCase(), this.huffmanCoding.tree);
        this.huffmanCoding.table = this.compression.getHuffmanDictionary(this.huffmanCoding.tree)
          .map(hc => {
            if (hc.char === ' ') {
              hc.char = 'space';
            }
            if (hc.char === ',') {
              hc.char = 'comma';
            }
            if (hc.index === '10') {
              hc.char = 'EOL';
            }
            return hc;
          });
        this.huffmanCoding.lines = getTextSplitByNumberOfCharacter(this.huffmanCoding.text, 60);

        this.lzwEncoding.text = data.low.text.substring(48, 81).toLowerCase();
        this.lzwEncoding.text = replaceAll(this.lzwEncoding.text, ' ', '_');
      });

    this.highEntropy = {
      artist: 'Math',
      name: '.random()',
      text: this.compression.getHighEntropyText(this.charLimit)
    };
    this.highEntropy = this.getProcessedEntropy(this.highEntropy);

    // Gucci gang Gucci gang Gucci gang
    this.lzwEncoding.rows = [
      {
        current: 'g',
        next: 'u',
        output: 'g',
        add: 'gu = 256'
      },
      {
        current: 'u',
        next: 'c',
        output: 'u',
        add: 'uc = 257'
      },
      {
        current: 'c',
        next: 'c',
        output: 'c',
        add: 'cc = 258'
      },
      {
        current: 'c',
        next: 'i',
        output: 'c',
        add: 'ci = 259'
      },
      {
        current: 'i',
        next: '_',
        output: 'i',
        add: '_i = 260'
      },
      {
        current: '_',
        next: 'g',
        output: '_',
        add: '_g = 261'
      },
      {
        current: 'g',
        next: 'a',
        output: 'g',
        add: 'ga = 262'
      },
      {
        current: 'a',
        next: 'n',
        output: 'a',
        add: 'an = 263'
      },
      {
        current: 'n',
        next: 'g',
        output: 'n',
        add: 'ng = 264'
      },
      {
        current: 'g',
        next: '_',
        output: 'g',
        add: 'g_ = 265'
      },
      {
        current: '_',
        next: 'g',
        output: '_g',
        add: '_gu = 266'
      },
      {
        current: 'u',
        next: 'c',
        output: 'uc',
        add: 'ucc = 267'
      },
      {
        current: 'c',
        next: 'i',
        output: 'ci',
        add: 'ci_ = 268'
      }
    ];
  }

  getRunLengthEncoding(image: AsciiImage): AsciiImage {
    image.lines = getTextSplitByNumberOfCharacter(image.text, image.width);
    image.encoded = this.compression.getRunLengthEncoded(image.text);
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
      return;
    }
    this.currentPage--;
  }

}
