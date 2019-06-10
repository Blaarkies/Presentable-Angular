import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Mask, MaskPixel } from 'src/app/image-processing/interfaces/mask';

@Component({
             selector: 'app-mask-editor',
             templateUrl: './mask-editor.component.html',
             styleUrls: ['./mask-editor.component.scss']
           })
export class MaskEditorComponent {

  @Input() mask: Mask;
  @Input() disabled = false;

  @Output() pixelHover = new EventEmitter<MaskPixel>();
  @Output() change = new EventEmitter<void>();

  plusPixelValue(pixel: MaskPixel): void {
    pixel.value++;
    this.change.emit();
  }

  minusPixelValue(pixel: MaskPixel): void {
    pixel.value--;
    this.change.emit();
  }

  onPixelHover(pixel: MaskPixel): void {
    if (pixel.value != null) {
      this.pixelHover.emit(pixel);
    }
  }

}
