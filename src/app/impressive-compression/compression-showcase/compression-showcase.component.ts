import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EntropyExample, JsonAsset} from "../../common/interface";
import {CompressionProcessorService} from "../compression-processor.service";

@Component({
  selector: 'app-explanation',
  templateUrl: './compression-showcase.component.html',
  styleUrls: ['./compression-showcase.component.css',
    '../../app.component.css']
})
export class CompressionShowcaseComponent implements OnInit {

  masterText: string;
  lowEntropy: EntropyExample = this.newEntropy();
  mediumEntropy: EntropyExample = this.newEntropy();

  charLimit = 400;

  constructor(private http: HttpClient,
              private compression: CompressionProcessorService) {
  }

  ngOnInit() {
    this.http.get("assets/compression-data.json")
      .subscribe((data: JsonAsset) => {
        this.lowEntropy = this.getProcessedEntropy(data.low);
        this.mediumEntropy = this.getProcessedEntropy(data.medium);
      });


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
    data.entropyScore = this.compression.getEntropyScore(data.text);
    return data;
  }

}
