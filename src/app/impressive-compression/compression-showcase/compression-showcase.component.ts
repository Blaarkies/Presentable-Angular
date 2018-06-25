import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";

@Component({
  selector: 'app-explanation',
  templateUrl: './compression-showcase.component.html',
  styleUrls: ['./compression-showcase.component.css',
    '../../app.component.css']
})
export class CompressionShowcaseComponent implements OnInit {

  masterText: string;

  constructor() {
  }

  ngOnInit() {
    new Observable().

    Observable.create().of('a').map(i => console.log(i));

    /*    this.http.get("assets/compression-data.json")
          .map(res => res.json())
          .subscribe(data => {
            // this.cache['config.json'] = new ConfigData(data.json());
            // resolve(true);
          });*/
  }

}
