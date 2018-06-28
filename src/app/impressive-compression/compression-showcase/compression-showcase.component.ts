import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EntropyExample, JsonAsset} from "../../common/interface";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-explanation',
  templateUrl: './compression-showcase.component.html',
  styleUrls: ['./compression-showcase.component.css',
    '../../app.component.css']
})
export class CompressionShowcaseComponent implements OnInit {

  masterText: string;
  lowEntropy: EntropyExample;
  mediumEntropy: EntropyExample;

  charLimit = 400;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {

    this.http.get("assets/compression-data.json")
      .pipe(map((data: JsonAsset) => {
        data.low.lines = data.low.text.substring(0, this.charLimit).split('\n');
        data.medium.lines = data.medium.text.substring(0, this.charLimit).split('\n');
        return data;
      }))
      .subscribe(data => {
        this.lowEntropy = data.low;
        this.mediumEntropy = data.medium;
      });


  }

}
