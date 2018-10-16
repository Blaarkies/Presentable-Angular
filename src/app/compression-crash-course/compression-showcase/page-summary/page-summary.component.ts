import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/title.service';

@Component({
             selector: 'app-page-summary',
             templateUrl: './page-summary.component.html',
             styleUrls: ['./page-summary.component.scss']
           })
export class PageSummaryComponent implements OnInit {

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
