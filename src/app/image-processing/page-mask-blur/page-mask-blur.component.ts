import { Component, ViewChild } from '@angular/core';
import { clone, sum } from 'src/app/common/utils';
import { PixelProcessorService } from 'src/app/image-processing/pixel-processor.service';
import { Image, Pixel } from 'src/app/image-processing/interfaces/image';
import { Mask, MaskPixel } from 'src/app/image-processing/interfaces/mask';
import { ImageDisplayComponent } from 'src/app/image-processing/sub-common/image-display/image-display.component';
import { FullscreenDualImageDialogComponent } from 'src/app/image-processing/sub-common/fullscreen-dual-image-dialog/fullscreen-dual-image-dialog.component';
import { MatDialog } from '@angular/material';

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
  inputC: string;

  constructor(private pixelProcessorService: PixelProcessorService,
              private dialog: MatDialog) {
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
        = this.inputC
        = null;
      return;
    }

    let nearPixels = this.sourceImage.getMaskedPixels(this.averageMask, pixel);
    let nearMask = Mask.fromPixels(nearPixels, pixel);

    let leftMask = <Mask>clone(nearMask);
    leftMask.pixels
            .filter(p => !(p.x == 0 && p.y == 0))
            .forEach(p => p.value = null);

    let surroundingMaskPixels = nearMask;
    surroundingMaskPixels.pixels.find(p => p.x == 0 && p.y == 0).value = null;

    this.kernelInputA = leftMask;
    this.kernelInputB = surroundingMaskPixels;

    this.inputC = nearPixels.map(p => p.value)
                            .join('+');

    let sumOfValues = sum(nearPixels, c => c.value);
    this.output = this.resultImage.pixels[pixel.index].value.toString();
    this.calculationText = `${sumOfValues} / ${nearPixels.length}`;
  }

  openFullscreenExampleDialog() {
    // https://github.com/angular/material2/issues/5268
    // TODO: work-around for expression change on dialog factory
    setTimeout(() => {
      this.dialog.open(FullscreenDualImageDialogComponent, {
        width: '98%',
        height: '95%',
        data: {
          title: 'Smoothing',
          styleClass: 'filter-blur'
        }
      })
          .afterClosed()
          .subscribe();
    });
  }

}
