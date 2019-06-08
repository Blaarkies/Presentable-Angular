import { Component, ViewChild } from '@angular/core';
import { ImageDisplayComponent } from 'src/app/image-processing/sub-common/image-display/image-display.component';
import { Image, Pixel } from 'src/app/image-processing/interfaces/image';
import { Mask } from 'src/app/image-processing/interfaces/mask';
import { PixelProcessorService } from 'src/app/image-processing/pixel-processor.service';
import { sum } from 'src/app/common/utils';

@Component({
             selector: 'app-page-custom-masks',
             templateUrl: './page-custom-masks.component.html',
             styleUrls: ['./page-custom-masks.component.scss']
           })
export class PageCustomMasksComponent {

  @ViewChild('result') resultImageDisplayer: ImageDisplayComponent;

  sourceImage: Image;
  resultImage: Image;

  customMask: Mask;
  inputA: string;
  inputB: string;
  inputC: string;
  output: string;
  calculationText: string;

  isAverage = true;
  hoverPixel: Pixel;
  kernelInputA: Mask;

  customFilter = nearPixels => {
    let divisor = sum(nearPixels, c => (c.maskValue));
    let value = sum(nearPixels, c => (c.value * c.maskValue));
    return this.isAverage
           ? value / (divisor || nearPixels.length)
           : value * nearPixels.length / this.customMask.pixels.length;
  };

  constructor(private pixelProcessorService: PixelProcessorService) {
    this.customMask = this.pixelProcessorService.getMaskFromString(
      `111
      111
      111`);

    this.sourceImage = this.pixelProcessorService.getImageFromString(
      `22355422
      23543452
      25322253
      35222353
      35255542
      25222222
      22532342
      22255522`, 7);

    this.filterImage();
  }

  private filterImage() {
    let tempImage = this.sourceImage
                        .getProcessedImageFrom(this.customMask, this.customFilter);

    if (this.resultImage) {
      this.resultImage.pixels
          .forEach(pix => pix.value = tempImage.pixels[pix.index].value);
    } else {
      this.resultImage = tempImage;
    }

    if (this.isAverage) {
      this.resultImage.capPixelValues(7);
    }
  }

  setVisibility(pixel: Pixel) {
    this.filterImage();
    this.resultImageDisplayer.setVisibility(pixel);
  }

  completeDestinationImage() {
    this.filterImage();
    this.resultImageDisplayer.completeDestinationImage();
  }

  setHoveredPixel(pixel: Pixel) {
    this.hoverPixel = pixel;
    if (!pixel) {
      this.inputA
        = this.inputB
        = this.inputC
        = this.kernelInputA
        = this.output
        = this.calculationText
        = null;
      return;
    }

    let nearPixels = this.sourceImage.getMaskedPixels(this.customMask, pixel);
    let nearMask = Mask.fromPixels(nearPixels);

    this.kernelInputA = nearMask;

    this.inputC = nearPixels.map((p, i) => ({a: p.value, b: this.customMask.pixels[i].value}))
                            .map(pair => `(${pair.a}×${pair.b})`)
                            .join('+');

    let sumOfValues = sum(nearPixels, c => c.value * c.maskValue);
    let sumOfMaskValues = sum(nearPixels, c => c.maskValue) || nearPixels.length;
    this.calculationText = this.isAverage ? `${sumOfValues} / ${sumOfMaskValues}` : `${sumOfValues}`;

    this.output = this.resultImage.pixels[pixel.index].value.toString();
  }

  setIsAverageSlider(checked: boolean) {
    this.isAverage = checked;
    this.filterImage();
  }

  activateSmoothMask() {
    this.customMask = this.pixelProcessorService.getMaskFromString(
      `111
      111
      111`);
    this.isAverage = true;
    this.filterImage();
  }

  activateGaussianMask() {
    this.customMask = this.pixelProcessorService.getMaskFromString(
      `121
      242
      121`);
    this.isAverage = true;
    this.filterImage();
  }

  activateSharpenMask() {
    this.customMask = this.pixelProcessorService.getMaskFromList(
      [
        -1, -2, -1,
        -2, 12, -2,
        -1, -2, -1
      ]);
    this.isAverage = false;
    this.filterImage();
  }
}
