import { Component, OnDestroy, OnInit } from '@angular/core';
import { getArrayRange, getRandomInteger } from 'src/app/common/utils';

@Component({
             selector: 'app-intro',
             templateUrl: './page-need-for-pixels.component.html',
             styleUrls: ['./page-need-for-pixels.component.scss']
           })
export class PageNeedForPixelsComponent implements OnInit, OnDestroy {

  pixels = getArrayRange(8 * 8)
    .map(_ => getRandomInteger(7));

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

}
