import { Component, OnInit, ViewChild } from '@angular/core';
import { Image, Pixel } from 'src/app/image-processing/interfaces/image';
import { Mask } from 'src/app/image-processing/interfaces/mask';
import { PixelProcessorService } from 'src/app/image-processing/pixel-processor.service';
import { ImageDisplayComponent } from 'src/app/image-processing/sub-common/image-display/image-display.component';
import { interval, Subject } from 'rxjs';
import { sample, takeUntil } from 'rxjs/operators';
import { MatDialog, MatSliderChange } from '@angular/material';
import { FullscreenDualImageDialogComponent } from 'src/app/image-processing/sub-common/fullscreen-dual-image-dialog/fullscreen-dual-image-dialog.component';

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
  outputB: string;
  output: string;
  calculationText: string;

  hoverPixel: Pixel;
  thresholdValue: number;
  thresholdSlider$ = new Subject<number>();

  constructor(private pixelProcessorService: PixelProcessorService,
              private dialog: MatDialog) {
    this.pointMask = new Mask();

    // This is the character "e"
    this.sourceImage = this.pixelProcessorService.getImageFromString(
      `12365422
      23543462
      25322253
      36222363
      36277642
      25221211
      12532342
      11265522`, 7);
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
      this.inputA
        = this.inputB
        = this.outputB
        = this.output
        = this.calculationText
        = null;
      return;
    }

    let isOverThreshold = pixel.value > this.thresholdValue;

    this.inputA = pixel.value.toString();
    this.inputB = this.thresholdValue.toString();
    this.outputB = isOverThreshold ? 'Yes' : 'No';
    this.output = (isOverThreshold ? 7 : 0).toString();
    this.calculationText = `${pixel.value} > ${this.thresholdValue}`;
  }

  setThresholdValueSlider($event: MatSliderChange) {
    this.thresholdSlider$.next($event.value);
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
          styleClass: 'filter-black-and-white'
        }
      })
          .afterClosed()
          .subscribe();
    });
  }
}
