import { Component, Input } from '@angular/core';
import { Mask, MaskPixel } from 'src/app/image-processing/interfaces/mask';

@Component({
             selector: 'app-mask-editor',
             templateUrl: './mask-editor.component.html',
             styleUrls: ['./mask-editor.component.scss']
           })
export class MaskEditorComponent {

  @Input() mask: Mask;
  @Input() disabled = false;

  plusPixelValue(pixel: MaskPixel): void {
    pixel.value++;
  }

  minusPixelValue(pixel: MaskPixel): void {
    pixel.value--;
  }

}
