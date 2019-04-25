import { Injectable } from '@angular/core';
import { Image, Pixel } from 'src/app/image-processing/interfaces/image';
import { Mask, MaskPixel } from 'src/app/image-processing/interfaces/mask';
import { getXYFromIndex } from 'src/app/common/utils';

@Injectable({
              providedIn: 'root'
            })
export class PixelProcessorService {

  constructor() {
  }

  getImageFromString(serialImage: string): Image {
    let {trimmedLines, width} = this.getTrimmedLinesAndWidth(serialImage);

    let pixels = trimmedLines.join('')
                             .split('')
                             .map((c, i) => (<Pixel>{
                               value: parseInt(c),
                               index: i,
                               visible: true
                             }));

    return new Image(pixels, width);
  }

  getMaskFromString(serialImage: string): Mask {
    let {trimmedLines, width} = this.getTrimmedLinesAndWidth(serialImage);
    let height = trimmedLines.length;

    let pixels = trimmedLines.join('')
                             .split('')
                             .map((c, i) => {
                               let [x, y] = getXYFromIndex(width, i);
                               let xOffset = (width - 1) / 2;
                               let yOffset = (height - 1) / 2;
                               return (<MaskPixel>{
                                 x: x - xOffset,
                                 y: y - yOffset,
                                 value: parseInt(c)
                               });
                             });

    return new Mask(pixels);
  }

  private getTrimmedLinesAndWidth(serialImage: string) {
    let trimmedLines = serialImage.split('\n')
                                  .map(line => line.trim());
    let width = trimmedLines[0].length;
    return {trimmedLines, width};
  }

}
