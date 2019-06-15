import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Image, Pixel } from 'src/app/image-processing/interfaces/image';
import { Mask } from 'src/app/image-processing/interfaces/mask';

interface PixelStats {
  range: number;
  mean: number;
}

@Component({
             selector: 'app-image-display',
             templateUrl: './image-display.component.html',
             styleUrls: ['./image-display.component.scss']
           })
export class ImageDisplayComponent implements OnInit {

  @Input() sourceImage: Image;
  @Input() mask: Mask = new Mask();
  @Input() highlightPixel: Pixel;
  @Input() showNegativeValues: boolean;
  @Input() title: string;
  @Input() showTitle: boolean = true;
  @Input() lockHighlights: boolean = false;

  @Output() pixelClick = new EventEmitter<Pixel>();
  @Output() pixelHover = new EventEmitter<Pixel>();
  @Output() pixelPress = new EventEmitter<Pixel>();

  _pressedPixel: Pixel;
  set pressedPixel(pixel: Pixel) {
    this._pressedPixel = pixel;
    setTimeout(_ => this._pressedPixel = null, 1000);
  }

  pixelStats: PixelStats;

  ngOnInit(): void {
    this.setPixelStats();
  }

  public setPixelStats() {
    let pixelValues = this.sourceImage.pixels.map(p => p.value);
    let min = Math.min(...pixelValues);
    let max = Math.max(...pixelValues);
    this.pixelStats = {
      range: max - min,
      mean: (max + min) / 2,
    };
  }

  setMaskVisibility(pixel: Pixel): void {
    if (this.lockHighlights) {
      return;
    }

    let image = this.sourceImage;
    image.pixels.forEach(pix => pix.maskVisible = false);

    if (!pixel) {
      return;
    }
    image.getMaskedPixels(this.mask, pixel)
         .forEach(pix => this.sourceImage
           .pixels[pix.index]
           .maskVisible = true);
  }

  onPixelClick(pixel: Pixel): void {
    this.pixelClick.emit(pixel);
  }

  onPixelHover(pixel: Pixel): void {
    if (this.lockHighlights) {
      return;
    }

    this.pixelHover.emit(pixel);

    this.setMaskVisibility(pixel);
  }

  onPixelPress(pixel: Pixel): void {
    this.pixelPress.emit(pixel);
    this.pressedPixel = pixel;
  }

  setVisibility(pixel: Pixel) {
    let destinationPixel = this.sourceImage.pixels[pixel.index];
    destinationPixel.visible = true;
  }

  completeDestinationImage(durationPerPixel: number = 100) {
    this.sourceImage
        .pixels
        .filter(pix => !pix.visible)
        .forEach((pix, i) => setTimeout(_ => pix.visible = true, i * durationPerPixel));
  }

}
