import { Component, OnDestroy, ViewChild } from '@angular/core';
import { ImageDisplayComponent } from 'src/app/image-processing/sub-common/image-display/image-display.component';
import { Image, Pixel } from 'src/app/image-processing/interfaces/image';
import { Mask, MaskPixel } from 'src/app/image-processing/interfaces/mask';
import { PixelProcessorService } from 'src/app/image-processing/pixel-processor.service';
import { sum } from 'src/app/common/utils';
import { Subject } from 'rxjs';
import { sampleTime, takeUntil } from 'rxjs/operators';

interface MaskProduct {
  display: string;
  kernelPixel: MaskPixel;
  highlight: boolean;
  imagePixel?: MaskPixel;
}

@Component({
             selector: 'app-page-kernel',
             templateUrl: './page-kernel.component.html',
             styleUrls: ['./page-kernel.component.scss']
           })
export class PageKernelComponent implements OnDestroy {

  @ViewChild('result') resultImageDisplayer: ImageDisplayComponent;

  unsubscribe$ = new Subject<void>();

  sourceImage: Image;
  resultImage: Image;

  customMask: Mask;
  products: MaskProduct[];
  output: string;
  calculationText: string;

  isAverage = true;
  pressedPixel: Pixel;
  kernelInputA: Mask;
  kernelResult: Mask;
  hoveredMaskPixel: MaskPixel;

  customFilter = nearPixels => {
    let divisor = sum(nearPixels, c => (c.maskValue));
    let value = sum(nearPixels, c => (c.value * c.maskValue));
    return this.isAverage
           ? value / (divisor || nearPixels.length)
           : value * nearPixels.length / this.customMask.pixels.length;
  };
  show3d: any;
  rotateX: number;
  rotateY: number;
  private lastX: number;
  private lastY: number;
  private panMove$ = new Subject();


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
    this.resetRotation();

    this.panMove$
        .pipe(
          sampleTime(100),
          takeUntil(this.unsubscribe$),
        )
        .subscribe(event => this.adjustRotation(event));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
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
        = this.kernelResult
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
                                highlight: false,
                                imagePixel: pA,
                              };
                            });

    this.kernelResult = Mask.fromPixels(nearPixels, pixel);
    this.kernelResult.pixels
        .filter(p => p.value != null)
        .forEach(p => {
          let kernelPixel = this.customMask.pixels.find(pB => pB.isSamePosition(p));
          p.value *= kernelPixel.value;
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

    this.kernelResult
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

  adjustRotation($event) {
    // 3d rotation does not match up with axis on screen.
    // X is mapped to the negative of Y movement
    // Y is mapped to the X movement
    this.rotateX = this.lastX - $event.deltaY / 2;
    this.rotateY = this.lastY + $event.deltaX / 2;
  }

  resetRotation() {
    this.rotateX = -19;
    this.rotateY = -50;

    this.setLastRotation();
  }

  setLastRotation() {
    this.lastX = this.rotateX;
    this.lastY = this.rotateY;
  }

  onPan($event) {
    this.panMove$.next($event);
  }
}
