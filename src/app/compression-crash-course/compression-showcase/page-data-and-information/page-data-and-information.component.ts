import { Component, OnInit } from '@angular/core';
import { JsonAsset } from 'src/app/common/interfaces';
import { CompressionShowcaseService } from 'src/app/compression-crash-course/compression-showcase/compression-showcase.service';

@Component({
             selector: 'app-page-data-and-information',
             templateUrl: './page-data-and-information.component.html'
           })
export class PageDataAndInformationComponent implements OnInit {

  data: JsonAsset;
  charLimit: number;

  constructor(private dataService: CompressionShowcaseService) {
  }

  ngOnInit() {
    this.dataService.data.subscribe(data => this.data = data);
    this.charLimit = this.dataService.charLimit;
  }

}
