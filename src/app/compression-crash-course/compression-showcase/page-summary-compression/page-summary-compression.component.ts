import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/title.service';

@Component({
             selector: 'app-page-summary-compression',
             templateUrl: './page-summary-compression.component.html',
             styleUrls: ['./page-summary-compression.component.scss']
           })
export class PageSummaryCompressionComponent implements OnInit {

  bulletNumber: number = 1;

  isPresentation = false;

  constructor(private titleService: TitleService) {
    this.isPresentation = this.titleService.isPresentation;
  }

  ngOnInit() {
    if (!this.isPresentation) {
      this.bulletNumber = Number.MAX_SAFE_INTEGER;
    }
  }

}
