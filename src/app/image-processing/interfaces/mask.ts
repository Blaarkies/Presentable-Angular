import { Pixel } from 'src/app/image-processing/interfaces/image';
import { flatMap, getArrayRange } from 'src/app/common/utils';

export class MaskPixel {

  x: number;
  y: number;
  value?: number;
  highlight?: boolean;

  constructor(x: number, y: number, value: number = 1, highlight: boolean = false) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.highlight = highlight;
  }

  static fromPixel(pixel: Pixel, imageWidth: number, value: number = 1) {
    let x = pixel.index % imageWidth;
    let y = Math.floor(pixel.index / imageWidth);
    return new this(x, y, value);
  }

  isSamePosition(other: MaskPixel): boolean {
    return other
      && other.x == this.x
      && other.y == this.y;
  }

}

export class Mask {

  pixels: MaskPixel[];

  constructor(pixels?: MaskPixel[]) {
    this.pixels = pixels || <MaskPixel[]>[{x: 0, y: 0}];
  }

  static fromPixels(pixels: Pixel[], centerPixel?: Pixel, fullSize: number = 3) {
    let maskSize = Mask.getMaskShapeSize(pixels);

    let maskPixels = <MaskPixel[]>flatMap(
      getArrayRange(maskSize.height)
        .map(i => i - 1)
        .map(y => getArrayRange(maskSize.width)
          .map(i => i - 1)
          .map(x => new MaskPixel(x, y))));
    pixels.forEach((p, i) => maskPixels[i].value = p.value);

    let fullMaskPixels = <MaskPixel[]>flatMap(
      getArrayRange(fullSize)
        .map(i => i - 1)
        .map(y => getArrayRange(fullSize)
          .map(i => i - 1)
          .map(x => new MaskPixel(x, y, null))))
      .map(blank => maskPixels.find(p => blank.x == p.x && blank.y == p.y) || blank);

    return new Mask(fullMaskPixels);
  }

  private static getMaskShapeSize(pixels: Pixel[]): MaskShapeSize {
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

interface MaskShapeSize {
  width: number;
  height: number;
  pixels: Pixel[];
}
