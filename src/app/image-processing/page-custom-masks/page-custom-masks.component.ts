import { Component, ViewChild } from '@angular/core';
import { ImageDisplayComponent } from 'src/app/image-processing/sub-common/image-display/image-display.component';
import { Image, Pixel } from 'src/app/image-processing/interfaces/image';
import { Mask, MaskPixel } from 'src/app/image-processing/interfaces/mask';
import { PixelProcessorService } from 'src/app/image-processing/pixel-processor.service';
import { sum } from 'src/app/common/utils';

interface MaskProduct {
  display: string;
  kernelPixel: MaskPixel;
  highlight: boolean;
}

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
  products: MaskProduct[];
  output: string;
  calculationText: string;

  isAverage = true;
  pressedPixel: Pixel;
  kernelInputA: Mask;
  hoveredMaskPixel: MaskPixel;

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
    if (this.pressedPixel) {
      return;
    }

    this.filterImage();
    this.resultImageDisplayer.setVisibility(pixel);
  }

  setHoveredPixel(pixel: Pixel) {
    if (this.pressedPixel) {
      return;
    }

    this.resultImageDisplayer.highlightPixel = pixel;
    if (!pixel) {
      this.products
        = this.kernelInputA
        = this.output
        = this.calculationText
        = null;
      return;
    }

    this.updateOutputs(pixel);
  }

  private updateOutputs(pixel: Pixel) {
    let nearPixels = this.sourceImage.getMaskedPixels(this.customMask, pixel);
    let nearMask = Mask.fromPixels(nearPixels, pixel);

    this.kernelInputA = nearMask;

    this.products = nearMask.pixels
                            .filter(pA => pA.value != null)
                            .map(pA => {
                            let kernelPixel = this.customMask.pixels.find(pB => pB.isSamePosition(pA));
                            return {
                              display: `(${pA.value}×${kernelPixel.value})`,
                              kernelPixel: kernelPixel,
                              highlight: false
                            };
                          });

    let sumOfValues = sum(nearPixels, c => c.value * c.maskValue);
    let sumOfMaskValues = sum(nearPixels, c => c.maskValue) || nearPixels.length;
    this.calculationText = this.isAverage ? `${sumOfValues} / ${sumOfMaskValues}` : `${sumOfValues}`;

    this.output = this.resultImage.pixels[pixel.index].value.toString();
  }

  setPressedPixel(pixel: Pixel) {
    if (!this.pressedPixel) {
      this.pressedPixel = pixel;
      return;
    }

    if (this.pressedPixel == pixel) {
      this.pressedPixel = this.hoveredMaskPixel = null;
      return;
    }
  }

  completeDestinationImage() {
    this.filterImage();
    this.resultImageDisplayer.completeDestinationImage();
  }

  setIsAverageSlider(checked: boolean) {
    this.isAverage = checked;
    this.filterImage();
    this.resultImageDisplayer.setPixelStats();
  }

  activateSmoothMask() {
    this.customMask = this.pixelProcessorService.getMaskFromString(
      `111
      111
      111`);
    this.isAverage = true;
    this.updateKernels();
    this.filterImage();
  }

  activateGaussianMask() {
    this.customMask = this.pixelProcessorService.getMaskFromString(
      `121
      282
      121`);
    this.isAverage = true;
    this.updateKernels();
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
    this.updateKernels();
    this.filterImage();
    this.resultImageDisplayer.setPixelStats();
  }

  setHoveredMaskPixel(pixel: MaskPixel) {
    this.hoveredMaskPixel = pixel;
    if (!(this.kernelInputA && this.customMask && this.products)) {
      return;
    }
    this.kernelInputA
        .pixels
        .forEach(p => p.highlight = p.isSamePosition(pixel));

    this.customMask
        .pixels
        .forEach(p => p.highlight = p.isSamePosition(pixel));

    this.products
        .forEach(product => product.highlight = product.kernelPixel.isSamePosition(pixel));
  }

  updateKernels() {
    let hoveredPixel = this.resultImageDisplayer.highlightPixel;
    if (!hoveredPixel) {
      return;
    }
    this.updateOutputs(hoveredPixel);
    this.setHoveredMaskPixel(null);
  }
}
