import { Component } from '@angular/core';
import { Image } from 'src/app/image-processing/interfaces/image';
import { PixelProcessorService } from 'src/app/image-processing/pixel-processor.service';

@Component({
             selector: 'app-intro',
             templateUrl: './page-need-for-pixels.component.html',
             styleUrls: ['./page-need-for-pixels.component.scss']
           })
export class PageNeedForPixelsComponent {

  sourceImage: Image;
  showPixels: boolean;

  constructor(private pixelProcessorService: PixelProcessorService) {
    this.sourceImage = this.pixelProcessorService.getImageFromString(
      `23445553
      34566554
      30246765
      50356766
      41455566
      02455776
      24567755
      45676765`, 7);
  }

}
