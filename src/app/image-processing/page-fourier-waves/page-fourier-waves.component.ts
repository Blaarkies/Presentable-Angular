import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Image, Pixel } from 'src/app/image-processing/interfaces/image';
import { PixelProcessorService } from 'src/app/image-processing/pixel-processor.service';
import { Subject } from 'rxjs';
import { Mask } from 'src/app/image-processing/interfaces/mask';
import { getArrayRange, getXYFromIndex } from 'src/app/common/utils';

@Component({
             selector: 'app-page-fourier-waves',
             templateUrl: './page-fourier-waves.component.html',
             styleUrls: ['./page-fourier-waves.component.scss']
           })
export class PageFourierWavesComponent implements OnInit {

  @ViewChild('wave') waveCanvas: ElementRef;

  unsubscribe$ = new Subject<void>();

  sourceImage: Image;
  resultImage: Image;

  pointMask: Mask;
  selectedRow: number;
  pixelsToDisplay: Pixel[];

  constructor(private pixelProcessorService: PixelProcessorService) {
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

    this.pointMask = new Mask();

    this.selectRowAsFourierInput(this.sourceImage.pixels[0]);
  }

  ngOnInit(): void {
    this.setWave();
  }

  private setWave() {
    let canvas: HTMLCanvasElement = this.waveCanvas.nativeElement;

    if (canvas == null || !canvas.getContext) {
      return;
    }
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'red';

    let frequency = (Math.PI * 2) * 4;
    let resolution = 100;
    let width = 480;
    let height = 50;
    let lineWidth = ctx.lineWidth;
    getArrayRange(resolution)
      .map(i => (i / resolution) * frequency)
      .forEach(t => {
        const x = (t / frequency) * width;
        const y = Math.sin(-t) * height + height + lineWidth;
        ctx.lineTo(x, y);
      });

    ctx.stroke();
  }

  selectRowAsFourierInput(pixel: Pixel) {
    let imageWidth = this.sourceImage.imageWidth;
    this.selectedRow = getXYFromIndex(imageWidth, pixel.index)[1];
    this.pixelsToDisplay = this.sourceImage.pixels
                               .slice(this.selectedRow * imageWidth, (this.selectedRow + 1) * imageWidth);

  }

  setHoveredPixel(pixel: Pixel) {

  }
}
