import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EntropyExample, JsonAsset} from "../../common/interface";
import {CompressionProcessorService} from "../compression-processor.service";
import {roundToDecimalPlace} from "../../common/utils";

@Component({
  selector: 'app-explanation',
  templateUrl: './compression-showcase.component.html',
  styleUrls: ['./compression-showcase.component.css',
    '../../app.component.css']
})
export class CompressionShowcaseComponent implements OnInit {

  currentPage: number = 3;

  lowEntropy: EntropyExample = this.newEntropy();
  mediumEntropy: EntropyExample = this.newEntropy();
  highEntropy: EntropyExample = this.newEntropy();

  charLimit = 400;
  startBlur: boolean;

  constructor(private http: HttpClient,
              private compression: CompressionProcessorService) {
  }

  ngOnInit() {
    this.http.get("assets/compression-data.json")
      .subscribe((data: JsonAsset) => {
        this.lowEntropy = this.getProcessedEntropy(data.low);
        this.mediumEntropy = this.getProcessedEntropy(data.medium);
      });

    this.highEntropy = {
      artist: 'Math',
      name: '.random()',
      text: this.compression.getHighEntropyText(this.charLimit)
    };
    this.highEntropy = this.getProcessedEntropy(this.highEntropy);
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


}
