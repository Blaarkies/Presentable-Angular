import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { ImageDisplayComponent } from 'src/app/image-processing/sub-common/image-display/image-display.component';
import { Image, Pixel } from 'src/app/image-processing/interfaces/image';
import { Mask } from 'src/app/image-processing/interfaces/mask';
import { PixelProcessorService } from 'src/app/image-processing/pixel-processor.service';
import { roundToDecimalPlace, sum } from 'src/app/common/utils';
import { MatDialog, MatSliderChange } from '@angular/material';
import { interval, Subject } from 'rxjs';
import { sample, takeUntil } from 'rxjs/operators';
import { FullscreenDualImageDialogComponent } from 'src/app/image-processing/sub-common/fullscreen-dual-image-dialog/fullscreen-dual-image-dialog.component';

@Component({
             selector: 'app-page-mask-sharpen',
             templateUrl: './page-mask-sharpen.component.html',
             styleUrls: ['./page-mask-sharpen.component.scss']
           })
export class PageMaskSharpenComponent implements OnDestroy, AfterViewInit {

  @ViewChild('sharp') sharpImageDisplayer: ImageDisplayComponent;
  @ViewChild('result') resultImageDisplayer: ImageDisplayComponent;

  unsubscribe$ = new Subject<void>();

  sourceImage: Image;
  sharpImage: Image;
  sumImage: Image;

  sharpMask: Mask;
  pointMask: Mask;
  inputA: string;
  inputB: string;
  output: string;

  sharpenPower = 1;
  sharpSlider$ = new Subject<number>();

  hoverPixel: Pixel;
  showMask: boolean;

  constructor(private pixelProcessorService: PixelProcessorService,
              private dialog: MatDialog) {
    this.pointMask = new Mask();
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

    this.setSharpImageAndResults();

    let updateDuration = 100;
    this.sharpSlider$.pipe(sample(interval(updateDuration)), takeUntil(this.unsubscribe$))
        .subscribe(sharpPower => {
          this.sharpenPower = sharpPower;
          this.setSharpImageAndResults();
        });
  }

  private setSharpImageAndResults() {
    let sharpFilter = nearPixels => {
      let sumOfMaskArea = sum(nearPixels, c => (c.value * c.maskValue));
      let ratioOfMaskAvailable = nearPixels.length / this.sharpMask.pixels.length;
      return sumOfMaskArea * ratioOfMaskAvailable * this.sharpenPower;
    };
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
               let sharpPix = this.sharpImage.pixels[pix.index].value;
               pix.value = roundToDecimalPlace(srcPix + sharpPix);
             });
    tempImage.capPixelValues(7);

    if (!this.sumImage) {
      this.sumImage = tempImage;
    } else {
      this.sumImage.pixels
          .forEach(pix => pix.value = tempImage.pixels[pix.index].value);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }

  ngAfterViewInit(): void {
    this.sharpImageDisplayer.completeDestinationImage(50);
    this.resultImageDisplayer.completeDestinationImage(60);
  }

  setHoveredPixel(pixel: Pixel) {
    this.hoverPixel = pixel;

    if (!pixel) {
      this.inputA
        = this.inputB
        = this.output
        = null;
      return;
    }

    let pixelIndex = pixel.index;
    this.inputA = pixel.value.toString();
    this.inputB = this.sharpImage.pixels[pixelIndex].value.toString();
    this.output = this.sumImage.pixels[pixelIndex].value.toString();
  }

  setSharpnessPowerSlider($event: MatSliderChange) {
    this.sharpSlider$.next($event.value);
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
          styleClass: 'filter-sharpen'
        }
      })
          .afterClosed()
          .subscribe();
    });
  }

}
