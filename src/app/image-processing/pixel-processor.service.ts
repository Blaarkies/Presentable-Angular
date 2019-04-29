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

  getImageFromString(serialImage: string, colorDepth?: number): Image {
    let {trimmedLines, width} = this.getTrimmedLinesAndWidth(serialImage);

    let pixels = trimmedLines.join('')
                             .split('')
                             .map((c, i) => (<Pixel>{
                               value: parseInt(c),
                               index: i,
                               visible: true
                             }));
    if (!colorDepth) {
      colorDepth = Math.max(...pixels.map(pix => pix.value));
    }

    return new Image(pixels, width, colorDepth);
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

  getMaskFromList(list: number[], height?: number, width?: number): Mask {
    if (!height || !width) {
      height = width = Math.sqrt(list.length);
    }

    let pixels = list.map((c, i) => {
      let [x, y] = getXYFromIndex(width, i);
      let xOffset = (width - 1) / 2;
      let yOffset = (height - 1) / 2;
      return (<MaskPixel>{
        x: x - xOffset,
        y: y - yOffset,
        value: c
      });
    });

    return new Mask(pixels);
  }

}
