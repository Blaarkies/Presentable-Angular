import { Component, OnInit } from '@angular/core';

@Component({
             selector: 'app-page-summary',
             templateUrl: './page-summary.component.html',
             styleUrls: ['./page-summary.component.scss']
           })
export class PageSummaryComponent implements OnInit {
  bulletNumber: number = 1;

  constructor() {
  }

  ngOnInit() {
  }

}
