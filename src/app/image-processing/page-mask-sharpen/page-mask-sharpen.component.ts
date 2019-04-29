import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ImageDisplayComponent } from 'src/app/image-processing/sub-common/image-display/image-display.component';
import { Image, Pixel } from 'src/app/image-processing/interfaces/image';
import { Mask } from 'src/app/image-processing/interfaces/mask';
import { PixelProcessorService } from 'src/app/image-processing/pixel-processor.service';
import { roundToDecimalPlace, sum } from 'src/app/common/utils';
import { MatSliderChange } from '@angular/material';
import { interval, Subject } from 'rxjs';
import { sample, takeUntil } from 'rxjs/operators';

@Component({
             selector: 'app-page-mask-sharpen',
             templateUrl: './page-mask-sharpen.component.html',
             styleUrls: ['./page-mask-sharpen.component.scss']
           })
export class PageMaskSharpenComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('sharp') sharpImageDisplayer: ImageDisplayComponent;
  @ViewChild('result') resultImageDisplayer: ImageDisplayComponent;

  sourceImage: Image;
  sharpImage: Image;
  sumImage: Image;

  sharpMask: Mask;

  sharpenPower = 1;
  resultPower = 0.1;
  sharpSlider$ = new Subject<number>();
  resultSlider$ = new Subject<number>();

  unsubscribe = new Subject<void>();
  grayPointValue: number;
  hoverPixel: Pixel;

  constructor(private pixelProcessorService: PixelProcessorService) {
    this.sharpMask = this.pixelProcessorService.getMaskFromList(
      [
        -1, -2, -1,
        -2, 12, -2,
        -1, -2, -1
      ]);

    this.sourceImage = this.pixelProcessorService.getImageFromString(
      `22355422
      23543452
      25322253
      35222353
      35255542
      25222222
      22532342
      22255522`, 7);

    this.grayPointValue = this.sourceImage.colorDepth / 2;
    this.setSharpImageAndResults();

    let updateDuration = 100;
    this.sharpSlider$.pipe(sample(interval(updateDuration)), takeUntil(this.unsubscribe))
        .subscribe(sharpPower => {
          this.sharpenPower = sharpPower;
          this.setSharpImageAndResults();
        });

    this.resultSlider$.pipe(sample(interval(updateDuration)), takeUntil(this.unsubscribe))
        .subscribe(resultPower => {
          this.resultPower = resultPower;
          this.setResultImage();
        });
  }

  private setSharpImageAndResults() {
    let sharpFilter = nearPixels => (sum(nearPixels, c => (c.value * c.maskValue)) + this.grayPointValue) * this.sharpenPower;
    let tempImage = this.sourceImage.getProcessedImageFrom(this.sharpMask, sharpFilter);
    if (!this.sharpImage) {
      this.sharpImage = tempImage;
    } else {
      this.sharpImage.pixels
          .forEach(pix => pix.value = tempImage.pixels[pix.index].value);
    }

    this.setResultImage();
  }

  private setResultImage() {
    let tempImage = this.sourceImage.getProcessedImageFrom(new Mask(), nearPixels => nearPixels[0].value);
    tempImage.pixels
             .forEach(pix => {
               let srcPix = this.sourceImage.pixels[pix.index].value;
               let sharpPix = this.sharpImage.pixels[pix.index].value - this.grayPointValue;
               pix.value = roundToDecimalPlace(srcPix + sharpPix * this.resultPower);
             });
    tempImage.capPixelValues(7);

    if (!this.sumImage) {
      this.sumImage = tempImage;
    } else {
      this.sumImage.pixels
          .forEach(pix => pix.value = tempImage.pixels[pix.index].value);
    }
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
  }

  ngAfterViewInit(): void {
    this.sharpImageDisplayer.completeDestinationImage(50);
    this.resultImageDisplayer.completeDestinationImage(60);
  }

  setHoveredPixel(pixel: Pixel) {
    this.hoverPixel = pixel;
  }

  setSharpnessPowerSlider($event: MatSliderChange) {
    this.sharpSlider$.next($event.value);
  }

  setResultPowerSlider($event: MatSliderChange) {
    this.resultSlider$.next($event.value);
  }

}
