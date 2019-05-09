import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageDisplayComponent } from 'src/app/image-processing/sub-common/image-display/image-display.component';
import { Image, Pixel } from 'src/app/image-processing/interfaces/image';
import { Mask } from 'src/app/image-processing/interfaces/mask';
import { PixelProcessorService } from 'src/app/image-processing/pixel-processor.service';
import { sum } from 'src/app/common/utils';
import { MatSlideToggleChange } from '@angular/material';

@Component({
             selector: 'app-page-custom-masks',
             templateUrl: './page-custom-masks.component.html',
             styleUrls: ['./page-custom-masks.component.scss']
           })
export class PageCustomMasksComponent implements OnInit {

  @ViewChild('result') resultImageDisplayer: ImageDisplayComponent;

  sourceImage: Image;
  resultImage: Image;

  customMask: Mask;
  inputA: string;
  inputB: string;
  output: string;
  calculationText: string;

  isAverage = true;
  hoverPixel: Pixel;

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

  ngOnInit() {
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
      this.inputA = this.inputB = this.output = this.calculationText = null;
      return;
    }

    let nearPixels = this.sourceImage.getMaskedPixels(this.customMask, pixel);

    this.inputA = nearPixels.map(pix => pix.value)
                            .join(', ');
    this.inputB = nearPixels.map(pix => pix.maskValue)
                            .join(', ');

    let sumOfValues = sum(nearPixels, c => c.value * c.maskValue);
    let sumOfMaskValues = sum(nearPixels, c => c.maskValue) || nearPixels.length;
    this.calculationText = this.isAverage ? `${sumOfValues} / ${sumOfMaskValues}` : `${sumOfValues}`;

    this.output = this.resultImage.pixels[pixel.index].value.toString();
  }

  setIsAverageSlider(checked: boolean) {
    this.isAverage = checked;
    this.filterImage();
  }
}
