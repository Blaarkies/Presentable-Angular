import { Component, OnInit, ViewChild } from '@angular/core';
import { Image, Pixel } from 'src/app/image-processing/interfaces/image';
import { Mask } from 'src/app/image-processing/interfaces/mask';
import { PixelProcessorService } from 'src/app/image-processing/pixel-processor.service';
import { ImageDisplayComponent } from 'src/app/image-processing/sub-common/image-display/image-display.component';

@Component({
             selector: 'app-page-pixel-manipulation',
             templateUrl: './page-pixel-manipulation.component.html',
             styleUrls: ['./page-pixel-manipulation.component.scss']
           })
export class PagePixelManipulationComponent implements OnInit {

  @ViewChild('result') resultImageDisplayer: ImageDisplayComponent;

  sourceImage: Image;
  resultImage: Image;

  pointMask: Mask;
  inputA: string;
  inputB: string;
  output: string;
  calculationText: string;

  constructor(private pixelProcessorService: PixelProcessorService) {
    this.pointMask = new Mask();

    // This is the character "e"
    this.sourceImage = this.pixelProcessorService.getImageFromString(
      `00377510
      03752670
      17200072
      27000273
      27077750
      17001100
      01720260
      00177700`, 7);

    let invertFilter = nearPixels => this.sourceImage.colorDepth - nearPixels[0].value;

    this.resultImage = this.sourceImage
                           .getProcessedImageFrom(this.pointMask, invertFilter);
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
    if (!pixel) {
      this.inputA = this.inputB = this.output = this.calculationText = null;
      return;
    }
    let colorDepth = this.sourceImage.colorDepth;

    this.inputA = pixel.value.toString();
    this.inputB = colorDepth.toString();
    this.output = (colorDepth - pixel.value).toString();
    this.calculationText = `${colorDepth} - ${pixel.value}`;
  }
}
