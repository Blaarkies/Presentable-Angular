import { Component, ViewChild } from '@angular/core';
import { ImageDisplayComponent } from 'src/app/image-processing/sub-common/image-display/image-display.component';
import { Image, Pixel } from 'src/app/image-processing/interfaces/image';
import { Mask, MaskPixel } from 'src/app/image-processing/interfaces/mask';
import { PixelProcessorService } from 'src/app/image-processing/pixel-processor.service';
import { sum } from 'src/app/common/utils';
import { MatDialog, MatSliderChange } from '@angular/material';
import { interval, Subject } from 'rxjs';
import { sample, takeUntil } from 'rxjs/operators';
import { FullscreenDualImageDialogComponent } from 'src/app/image-processing/sub-common/fullscreen-dual-image-dialog/fullscreen-dual-image-dialog.component';

interface MaskProduct {
  display: string;
  kernelPixel: MaskPixel;
  highlight: boolean;
}

@Component({
             selector: 'app-page-mask-median',
             templateUrl: './page-mask-median.component.html',
             styleUrls: ['./page-mask-median.component.scss']
           })
export class PageMaskMedianComponent {

  @ViewChild('result') resultImageDisplayer: ImageDisplayComponent;

  unsubscribe$ = new Subject<void>();

  sourceImage: Image;
  resultImage: Image;

  percentile = 50;
  percentileSlider$ = new Subject<number>();

  medianMask: Mask;
  pixelValues: MaskProduct[];
  output: string;
  calculationText: string;

  pressedPixel: Pixel;
  maskSelection: Mask;

  customFilter = nearPixels => {
    let indexOnPercentile = Math.round((nearPixels.length - 1) * this.percentile * 0.01);
    return nearPixels.sort((a, b) => a.value - b.value)[indexOnPercentile].value;
  };

  constructor(private pixelProcessorService: PixelProcessorService,
              private dialog: MatDialog) {
    this.medianMask = this.pixelProcessorService.getMaskFromString(
      `111
      111
      111`);

    this.sourceImage = this.pixelProcessorService.getImageFromString(
     `00050000
      70660204
      06776050
      06756007
      00660044
      60000144
      00500044
      30007000`, 7);

    this.filterImage();

    let updateDuration = 100;
    this.percentileSlider$
        .pipe(
          sample(interval(updateDuration)),
          takeUntil(this.unsubscribe$)
        )
        .subscribe(percentile => {
          this.percentile = percentile;
          this.filterImage();
        });
  }

  private filterImage() {
    let tempImage = this.sourceImage
                        .getProcessedImageFrom(this.medianMask, this.customFilter);

    if (this.resultImage) {
      this.resultImage.pixels
          .forEach(pix => pix.value = tempImage.pixels[pix.index].value);
    } else {
      this.resultImage = tempImage;
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
      this.pixelValues
        = this.maskSelection
        = this.output
        = this.calculationText
        = null;
      return;
    }

    this.updateOutputs(pixel);
  }

  private updateOutputs(pixel: Pixel) {
    let nearPixels = this.sourceImage.getMaskedPixels(this.medianMask, pixel);
    let nearMask = Mask.fromPixels(nearPixels, pixel);

    let notNullPixels = nearMask.pixels.filter(pA => pA.value != null);
    let indexOnPercentile = Math.round((notNullPixels.length - 1) * this.percentile * 0.01);
    notNullPixels.sort((a, b) => a.value - b.value)[indexOnPercentile].highlight = true;

    this.maskSelection = nearMask;

    this.pixelValues = notNullPixels.sort((a, b) => a.value - b.value)
                                    .map(pA => {
                                      let kernelPixel = this.maskSelection
                                                            .pixels
                                                            .find(pB => pB.isSamePosition(pA));
                                      return {
                                        display: pA.value.toString(),
                                        kernelPixel: kernelPixel,
                                        highlight: kernelPixel.highlight
                                      };
                                    });

    this.calculationText = this.resultImage.pixels[pixel.index].value.toString();

    this.output = this.resultImage.pixels[pixel.index].value.toString();
  }

  setPressedPixel(pixel: Pixel) {
    if (!this.pressedPixel) {
      this.pressedPixel = pixel;
      return;
    }

    if (this.pressedPixel == pixel) {
      this.pressedPixel =  null;
      return;
    }
  }

  completeDestinationImage() {
    this.filterImage();
    this.resultImageDisplayer.completeDestinationImage();
  }

  setPercentileSlider($event: MatSliderChange): void {
    this.percentileSlider$.next($event.value);
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
          styleClass: 'filter-median'
        }
      })
          .afterClosed()
          .subscribe();
    });
  }

}
