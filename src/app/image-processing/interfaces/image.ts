import { getXYFromIndex, roundToDecimalPlace } from 'src/app/common/utils';
import { Mask, MaskPixel } from 'src/app/image-processing/interfaces/mask';

export class Pixel {
  value: number;
  index: number;
  visible? = true;
  maskVisible? = false;
  maskValue?: number;
}

export class Image {

  pixels: Pixel[];
  imageWidth: number;

  constructor(pixels: Pixel[], imageWidth: number) {
    this.pixels = pixels;
    this.imageWidth = imageWidth;
  }

  getProcessedImageFrom(mask: Mask, filter: (maskedPixels: Pixel[]) => number) {
    let width = this.imageWidth;
    let pixels = this.pixels
                     .map(pix => {
                       let maskedPixels = this.getMaskedPixels(mask, pix);

                       let result = filter(maskedPixels);

                       return <Pixel>{
                         value: roundToDecimalPlace(result),
                         index: pix.index
                       };
                     });

    return new Image(pixels, width);
  }

  getMaskedPixels(mask: Mask, centerPixel: Pixel): Pixel[] {
    let [centerX, centerY] = getXYFromIndex(this.imageWidth, centerPixel.index);
    return mask.pixels
               .map(({x, y, value}) => ({x: centerX + x, y: centerY + y, value}))
               .filter(({x, y}) => this.isInBounds(x, y))
               .map(({x, y, value}) => {
                 let pixel = this.getByXY(x, y);
                 return <Pixel>{
                   value: pixel.value,
                   index: pixel.index,
                   maskValue: value
                 };
               });
  }

  isInBounds(x: number, y: number) {
    return x >= 0 && x < this.imageWidth
      && y >= 0 && y < this.imageWidth;
  }

  getByXY(x: number, y: number): Pixel {
    return this.pixels[y * this.imageWidth + x];
  }

}
