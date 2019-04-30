import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Image, Pixel } from 'src/app/image-processing/interfaces/image';
import { Mask } from 'src/app/image-processing/interfaces/mask';

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

  @Output() pixelClick = new EventEmitter<Pixel>();
  @Output() pixelHover = new EventEmitter<Pixel>();

  constructor() {
  }

  ngOnInit() {
  }

  setMaskVisibility(pixel: Pixel): void {
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

  onPixelClick(pixel: Pixel) {
    this.pixelClick.emit(pixel);
  }

  onPixelHover(pixel: Pixel) {
    this.pixelHover.emit(pixel);

    this.setMaskVisibility(pixel);
  }

  setVisibility(pixel: Pixel) {
    let destinationPixel = this.sourceImage.pixels[pixel.index];
    destinationPixel.visible = !destinationPixel.visible;
  }

  completeDestinationImage(durationPerPixel: number = 100) {
    this.sourceImage
        .pixels
        .filter(pix => !pix.visible)
        .forEach((pix, i) => setTimeout(_ => pix.visible = true, i * durationPerPixel));
  }
}
