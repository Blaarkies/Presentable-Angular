import { getXYFromIndex, roundToDecimalPlace } from 'src/app/common/utils';
import { Mask } from 'src/app/image-processing/interfaces/mask';

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
  colorDepth: number;

  constructor(pixels: Pixel[], imageWidth: number, colorDepth: number) {
    this.pixels = pixels;
    this.imageWidth = imageWidth;
    this.colorDepth = colorDepth;
  }

  getProcessedImageFrom(mask: Mask, filter: (maskedPixels: Pixel[]) => number) {
    let pixels = this.pixels
                     .map(pix => {
                       let maskedPixels = this.getMaskedPixels(mask, pix);

                       let result = filter(maskedPixels);

                       return <Pixel>{
                         value: roundToDecimalPlace(result),
                         index: pix.index
                       };
                     });

    return new Image(pixels, this.imageWidth, this.colorDepth);
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

  isInBounds(x: number, y: number): boolean {
    return x >= 0 && x < this.imageWidth
      && y >= 0 && y < this.imageWidth;
  }

  getByXY(x: number, y: number): Pixel {
    return this.pixels[y * this.imageWidth + x];
  }

  capPixelValues(colorDepth: number): void {
    this.pixels
        .forEach(pix => {
          if (pix.value < 0) {
            pix.value = 0;
          } else if (pix.value > colorDepth) {
            pix.value = colorDepth;
          }
        });
  }
}
