import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AsciiImage, EntropyExample, JsonAsset} from "../../common/interface";
import {CompressionProcessorService} from "../compression-processor.service";
import {roundToDecimalPlace} from "../../common/utils";

@Component({
  selector: 'app-explanation',
  templateUrl: './compression-showcase.component.html',
  styleUrls: ['./compression-showcase.component.css',
    '../../app.component.scss']
})
export class CompressionShowcaseComponent implements OnInit {

  currentPage: number = 3;

  lowEntropy: EntropyExample = this.newEntropy();
  mediumEntropy: EntropyExample = this.newEntropy();
  highEntropy: EntropyExample = this.newEntropy();

  charLimit = 400;
  startBlur: boolean;

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
    image.lines = this.getTextSplitByNumberOfCharacter(image.text, image.width);
    let encoded = this.compression.getRunLengthEncoded(image.text);
    image.encoded = this.getTextSplitByNumberOfCharacter(encoded, 30);
    image.entropyScore = this.compression.getEntropyScore(image.text.slice(0, this.charLimit));
    image.entropyFraction = roundToDecimalPlace(100 * image.entropyScore / this.charLimit, 2);
    return image;
  }

  getSplitText(text: string): string[] {
    return text.substring(0, this.charLimit).split('\n');
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
    data.lines = this.getSplitText(data.text);
    data.entropyScore = this.compression.getEntropyScore(data.text.slice(0, this.charLimit));
    data.entropyFraction = roundToDecimalPlace(100 * data.entropyScore / this.charLimit, 2);
    return data;
  }

  switchPage(forward: boolean) {
    this.startBlur = true;

    setTimeout(() => {
        this.startBlur = false;
        if (forward) {
          this.currentPage++;
          return;
        }
        this.currentPage--;
      },
      1000);
  }

  getTextSplitByNumberOfCharacter(text: string, width: number) {
    return text
      .split('')
      .reduce((sum, c) => {
          let newestLineIndex = sum.findIndex(line => line.length < width);

          if (newestLineIndex > -1) {
            sum[newestLineIndex] = sum[newestLineIndex] + c;
          } else {
            sum.push(c);
          }
          return sum;
        },
        ['']
      );
  }

}
