import { Component, OnInit } from '@angular/core';
import { Pixel } from 'src/app/image-processing/interfaces';
import { roundToDecimalPlace, sum } from 'src/app/common/utils';

@Component({
             selector: 'app-page-mask-blur',
             templateUrl: './page-mask-blur.component.html',
             styleUrls: ['./page-mask-blur.component.scss',
                         '../page-pixel-manipulation/page-pixel-manipulation.component.scss']
           })
export class PageMaskBlurComponent implements OnInit {

  imageWidth = 8;

  sourcePixels: Pixel[];
  resultPixels: Pixel[];

  averageMaskCoordinates = [
    {x: 0, y: 0},
    {x: 1, y: 0},
    {x: 1, y: -1},
    {x: 0, y: -1},
    {x: -1, y: -1},
    {x: -1, y: 0},
    {x: -1, y: 1},
    {x: 0, y: 1},
    {x: 1, y: 1},
  ];

  constructor() {
    this.sourcePixels = // This is the character "e"
      `00007270
      00007270
      00707270
      00007270
      00000000
      00007777
      00007777
      00007777`
        .split('\n')
        .map(line => line.trim())
        .join('')
        .split('')
        .map((c, i) => ({
          value: parseInt(c),
          index: i
        }));

    this.resultPixels = this.sourcePixels
                            .map((pix, i, f) => {
                              let [centerX, centerY] = this.getXYFromIndex(this.imageWidth, i);
                              let nearPixels = this.averageMaskCoordinates
                                                   .map(({x, y}) => ({x: centerX + x, y: centerY + y}))
                                                   .filter(({x, y}) => x >= 0
                                                     && x < this.imageWidth
                                                     && y >= 0
                                                     && y < this.imageWidth)
                                                   .map(({x, y}) => this.getByXY(f, this.imageWidth, x, y));
                              return {
                                value: sum(nearPixels, c => c.value) / nearPixels.length,
                                index: pix.index
                              };
                            })
                            .map(pix => {
                              pix.value = roundToDecimalPlace(pix.value);
                              return pix;
                            });
  }

  ngOnInit() {
  }

  setVisibility(pixel: Pixel) {
    let destinationPixel = this.resultPixels[pixel.index];
    destinationPixel.visible = !destinationPixel.visible;
  }

  completeDestinationImage() {
    this.resultPixels
        .filter(pix => !pix.visible)
        .forEach((pix, i) => setTimeout(_ => pix.visible = true, i * 100));
  }

  private getByXY(serialImage: Pixel[], imageWidth: number, x: number, y: number): Pixel {
    return serialImage[y * imageWidth + x];
  }

  private getXYFromIndex(imageWidth: number, i: number): number[] {
    return [i % imageWidth, Math.floor(i / imageWidth)];
  }

  setMaskVisibility(pixel: Pixel): void {
    this.sourcePixels.forEach(pix => pix.maskVisible = false);

    if (!pixel) {
      return;
    }
    let [centerX, centerY] = this.getXYFromIndex(this.imageWidth, pixel.index);
    this.averageMaskCoordinates
        .map(({x, y}) => ({x: centerX + x, y: centerY + y}))
        .filter(({x, y}) => x >= 0
          && x < this.imageWidth
          && y >= 0
          && y < this.imageWidth)
        .map(({x, y}) => this.getByXY(this.sourcePixels, this.imageWidth, x, y))
        .forEach(pix => pix.maskVisible = true);

  }
}
