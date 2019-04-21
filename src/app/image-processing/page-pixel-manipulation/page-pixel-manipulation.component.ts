import { Component, OnInit } from '@angular/core';
import { Pixel } from 'src/app/image-processing/interfaces';

@Component({
             selector: 'app-page-pixel-manipulation',
             templateUrl: './page-pixel-manipulation.component.html',
             styleUrls: ['./page-pixel-manipulation.component.scss']
           })
export class PagePixelManipulationComponent implements OnInit {

  colorDepthAmount = 7;

  sourcePixels: Pixel[];
  resultPixels: Pixel[];

  constructor() {
    this.sourcePixels = // This is the character "e"
      `00377510
      03752670
      17200072
      27000273
      27077750
      17001100
      01720260
      00177700`
        .split('\n')
        .map(line => line.trim())
        .join('')
        .split('')
        .map((c, i) => ({
          value: parseInt(c),
          index: i
        }));

    this.resultPixels = this.sourcePixels
                            .map(pix => ({
                              value: this.colorDepthAmount - pix.value,
                              index: pix.index
                            }));
  }

  ngOnInit() {
  }

  setVisibility(pixel: Pixel) {
    let destinationPixel = this.resultPixels
                               .find(p => p.index === pixel.index);
    destinationPixel.visible = !destinationPixel.visible;
  }

  completeDestinationImage() {
    this.resultPixels
        .filter(pix => !pix.visible)
        .forEach((pix, i) => setTimeout(_ => pix.visible = true, i * 100));
  }
}
