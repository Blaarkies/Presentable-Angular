import { Component, OnInit } from '@angular/core';
import { getArrayRange, getRandomInteger } from 'src/app/common/utils';

@Component({
             selector: 'app-page-pixel-manipulation',
             templateUrl: './page-pixel-manipulation.component.html',
             styleUrls: ['./page-pixel-manipulation.component.scss']
           })
export class PagePixelManipulationComponent implements OnInit {

  colorDepthAmount = 7;

  sourcePixels = getArrayRange(8 * 8) // TODO: give real values
    .map(_ => getRandomInteger(7));

  resultPixels = this.sourcePixels // TODO: give real values
                     .map(i => this.colorDepthAmount - i);

  constructor() {

  }

  ngOnInit() {
  }

}
