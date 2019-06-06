import { Component, ViewChild } from '@angular/core';
import { clone, sum } from 'src/app/common/utils';
import { PixelProcessorService } from 'src/app/image-processing/pixel-processor.service';
import { Image, Pixel } from 'src/app/image-processing/interfaces/image';
import { Mask, MaskPixel } from 'src/app/image-processing/interfaces/mask';
import { ImageDisplayComponent } from 'src/app/image-processing/sub-common/image-display/image-display.component';

@Component({
             selector: 'app-page-mask-blur',
             templateUrl: './page-mask-blur.component.html',
             styleUrls: ['./page-mask-blur.component.scss']
           })
export class PageMaskBlurComponent {

  @ViewChild('result') resultImageDisplayer: ImageDisplayComponent;

  sourceImage: Image;
  resultImage: Image;

  averageMask: Mask;
  output: string;
  calculationText: string;

  hoverPixel: Pixel;
  kernelInputA: Mask;
  kernelInputB: Mask;

  constructor(private pixelProcessorService: PixelProcessorService) {
    this.averageMask = this.pixelProcessorService.getMaskFromString(
      `111
      111
      111`);

    this.sourceImage = this.pixelProcessorService.getImageFromString(
      `00007270
      00007270
      00707270
      00007270
      00000000
      00007777
      00007777
      00007777`, 7);

    let averageFilter = nearPixels => sum(nearPixels, c => c.value) / nearPixels.length;

    this.resultImage = this.sourceImage
                           .getProcessedImageFrom(this.averageMask, averageFilter);
  }

  setVisibility(pixel: Pixel) {
    this.resultImageDisplayer.setVisibility(pixel);
  }

  completeDestinationImage() {
    this.resultImageDisplayer.completeDestinationImage();
  }

  setHoveredPixel(pixel: Pixel) {
    this.hoverPixel = pixel;
    if (!pixel) {
      this.output
        = this.calculationText
        = this.kernelInputA
        = this.kernelInputB
        = null;
      return;
    }

    let nearPixels = this.sourceImage.getMaskedPixels(this.averageMask, pixel);
    let selectedPixelIndex = nearPixels.findIndex(p => p.index == pixel.index);
    let nearMask = Mask.fromPixels(nearPixels);

    let centerMask = <Mask>clone(nearMask);
    centerMask.pixels
              .filter((p, i) => i !== selectedPixelIndex)
              .forEach(p => p.value = null);

    let surroundingMaskPixels = nearMask;
    surroundingMaskPixels.pixels[selectedPixelIndex].value = null;

    this.kernelInputA = centerMask;
    this.kernelInputB = surroundingMaskPixels;

    let sumOfValues = sum(nearPixels, c => c.value);
    this.output = this.resultImage.pixels[pixel.index].value.toString();
    this.calculationText = `${sumOfValues} / ${nearPixels.length}`;
  }


}
