import { Pixel } from 'src/app/image-processing/interfaces/image';
import { flatMap, getArrayRange } from 'src/app/common/utils';

export class MaskPixel {
  x: number;
  y: number;
  value? = 1;


  constructor(width: number, index: number, value: number = 1) {
    this.x = index % width;
    this.y = Math.floor(index / width);
    this.value = value;
  }

}

export class Mask {

  pixels: MaskPixel[];

  constructor(pixels?: MaskPixel[]) {
    this.pixels = pixels || <MaskPixel[]>[{x: 0, y: 0}];
  }

  static fromPixels(pixels: Pixel[]) {
    let maskSize = Mask.getMaskShapeSize(pixels);

    let maskPixels = <MaskPixel[]>flatMap(
      getArrayRange(maskSize.height)
        .map(y => getArrayRange(maskSize.width)
          .map(x => <MaskPixel>{
                 x: x,
                 y: y
               }
          )));
    pixels.forEach((p, i) => maskPixels[i].value = p.value);

    let fullMaskPixels = <MaskPixel[]>flatMap(
      getArrayRange(3)
        .map(y => getArrayRange(3)
          .map(x => <MaskPixel>{
                 x: x,
                 y: y,
                 value: null
               }
          )))
      .map(blank => maskPixels.find(p => blank.x == p.x && blank.y == p.y) || blank);

    return new Mask(fullMaskPixels);
  }

  private static getMaskShapeSize(pixels) {
    return pixels.reduce((sum, c) => {
      if (sum.pixels[0]
        && sum.pixels[0].index < c.index
        && sum.height == 1) {
        sum.width++;
      }

      if (sum.pixels[0]
        && sum.pixels[0].index < (c.index - 1)) {
        sum.height++;
      }

      sum.pixels.unshift(c);
      return sum;
    }, {
                           width: 0,
                           height: 1,
                           pixels: []
                         });
  }

}
