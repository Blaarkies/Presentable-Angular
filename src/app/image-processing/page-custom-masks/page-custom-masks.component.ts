import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageDisplayComponent } from 'src/app/image-processing/sub-common/image-display/image-display.component';
import { Image, Pixel } from 'src/app/image-processing/interfaces/image';
import { Mask, MaskPixel } from 'src/app/image-processing/interfaces/mask';
import { PixelProcessorService } from 'src/app/image-processing/pixel-processor.service';
import { sum } from 'src/app/common/utils';

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

  customFilter = nearPixels => {
    let divisor = sum(nearPixels, c => (c.maskValue));
    return sum(nearPixels, c => (c.value * c.maskValue)) / (divisor || 1);
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
      22255522`);

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

    this.resultImage.pixels
        .forEach(pix => {
          if (pix.value < 0) {
            pix.value = 0;
          } else if (pix.value > 7) {
            pix.value = 7;
          }
        });
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
    if (!pixel) {
      this.inputA = this.inputB = this.output = this.calculationText = null;
      return;
    }

    this.inputA = pixel.value.toString();
    this.inputB = this.customMask.pixels.find(pix => pix.x == 0 && pix.y == 0)
                      .value
                      .toString();
    let nearPixels = this.sourceImage.getMaskedPixels(this.customMask, pixel);
    let sumOfValues = sum(nearPixels, c => c.value);
    let sumOfMaskValues = sum(nearPixels, c => c.maskValue);
    this.output = this.resultImage.pixels[pixel.index].value.toString();
    this.calculationText = `${sumOfValues} / ${sumOfMaskValues}`;
  }

  updateMaskPixel($event: Event & {target: {value: string}}, pixel: MaskPixel) {
    pixel.value = parseInt($event.target.value);
  }
}
