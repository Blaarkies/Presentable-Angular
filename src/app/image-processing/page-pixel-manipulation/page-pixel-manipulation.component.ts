import { Component, OnInit, ViewChild } from '@angular/core';
import { Image, Pixel } from 'src/app/image-processing/interfaces/image';
import { Mask } from 'src/app/image-processing/interfaces/mask';
import { PixelProcessorService } from 'src/app/image-processing/pixel-processor.service';
import { ImageDisplayComponent } from 'src/app/image-processing/sub-common/image-display/image-display.component';
import { interval, Subject } from 'rxjs';
import { sample, takeUntil } from 'rxjs/operators';
import { sum } from 'src/app/common/utils';
import { MatSliderChange } from '@angular/material';

@Component({
             selector: 'app-page-pixel-manipulation',
             templateUrl: './page-pixel-manipulation.component.html',
             styleUrls: ['./page-pixel-manipulation.component.scss']
           })
export class PagePixelManipulationComponent implements OnInit {

  @ViewChild('result') resultImageDisplayer: ImageDisplayComponent;

  unsubscribe$ = new Subject<void>();

  sourceImage: Image;
  resultImage: Image;

  pointMask: Mask;
  inputA: string;
  inputB: string;
  output: string;
  calculationText: string;

  hoverPixel: Pixel;

  thresholdValue: number;
  thresholdSlider$ = new Subject<number>();

  constructor(private pixelProcessorService: PixelProcessorService) {
    this.pointMask = new Mask();

    // This is the character "e"
    this.sourceImage = this.pixelProcessorService.getImageFromString(
      `22355422
      23543452
      25322253
      35222353
      35255542
      25222222
      22532342
      22255522`, 7);
    this.thresholdValue = Math.round(this.sourceImage.colorDepth / 2);
    this.setThresholdImage();

    let updateDuration = 100;
    this.thresholdSlider$.pipe(sample(interval(updateDuration)), takeUntil(this.unsubscribe$))
        .subscribe(thresholdValue => {
          this.thresholdValue = thresholdValue;
          this.setThresholdImage();
        });
  }

  private setThresholdImage() {
    let binaryFilter = nearPixels => (nearPixels[0].value > this.thresholdValue)
                                     ? 7
                                     : 0;
    let tempImage = this.sourceImage.getProcessedImageFrom(this.pointMask, binaryFilter);
    if (!this.resultImage) {
      this.resultImage = tempImage;
    } else {
      this.resultImage.pixels
          .forEach(pix => pix.value = tempImage.pixels[pix.index].value);
    }
  }

  ngOnInit() {
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
      this.inputA = this.inputB = this.output = this.calculationText = null;
      return;
    }

    this.inputA = pixel.value.toString();
    this.inputB = this.thresholdValue.toString();
    this.output = (pixel.value > this.thresholdValue ? 7 : 0).toString();
    this.calculationText = `${pixel.value} > ${this.thresholdValue}`;
  }

  setThresholdValueSlider($event: MatSliderChange) {
    this.thresholdSlider$.next($event.value);
  }
}
