import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AsciiImage, EntropyExample, JsonAsset} from "../../common/interface";
import {CompressionProcessorService} from "../compression-processor.service";
import {getTextSplitByNumberOfCharacter, roundToDecimalPlace} from "../../common/utils";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-explanation',
  templateUrl: './compression-showcase.component.html',
  styleUrls: ['./compression-showcase.component.css',
    '../../app.component.scss'],
  animations: [
    trigger('visibilityChanged', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateX(-40px)'}),
        animate(600, style({opacity: 1, transform: 'translateX(0)'}))
      ]),
      transition(':leave', [
        style({opacity: 1, transform: 'translateX(0)'}),
        animate(600, style({opacity: 0, transform: 'translateX(-40px)'}))
      ])
    ])
  ]
})
export class CompressionShowcaseComponent implements OnInit {

  currentPage: number = 1;

  lowEntropy: EntropyExample = this.newEntropy();
  mediumEntropy: EntropyExample = this.newEntropy();
  highEntropy: EntropyExample = this.newEntropy();

  charLimit = 400;

  runLengthImage: AsciiImage = this.newAsciiImage();

  constructor(private http: HttpClient,
              private compression: CompressionProcessorService) {
  }

  ngOnInit() {
    this.http.get("assets/compression-data.json")
      .subscribe((data: JsonAsset) => {
        this.lowEntropy = this.getProcessedEntropy(data.low);
        this.mediumEntropy = this.getProcessedEntropy(data.medium);
        this.runLengthImage = this.getRunLengthEncoding(data.asciiImage);

      });

    this.highEntropy = {
      artist: 'Math',
      name: '.random()',
      text: this.compression.getHighEntropyText(this.charLimit)
    };
    this.highEntropy = this.getProcessedEntropy(this.highEntropy);
  }

  getRunLengthEncoding(image: AsciiImage): AsciiImage {
    image.lines = getTextSplitByNumberOfCharacter(image.text, image.width);
    let encoded = this.compression.getRunLengthEncoded(image.text);
    image.encoded = getTextSplitByNumberOfCharacter(encoded, 30);
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
    data.entropyScore = this.compression.getEntropyScore(data.text.slice(0, this.charLimit));
    data.entropyFraction = roundToDecimalPlace(100 * data.entropyScore / this.charLimit, 2);
    return data;
  }

  switchPage(forward: boolean) {
    if ((this.currentPage - 1 === 0 && !forward)
      || this.currentPage + 1 === 5 && forward) {
      return;
    }

    if (forward) {
      this.currentPage++;
      return;
    }
    this.currentPage--;
  }

}
