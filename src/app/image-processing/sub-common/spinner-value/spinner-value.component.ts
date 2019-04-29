import { Component, Input, OnInit } from '@angular/core';
import { MaskPixel } from 'src/app/image-processing/interfaces/mask';

@Component({
             selector: 'app-spinner-value',
             templateUrl: './spinner-value.component.html',
             styleUrls: ['./spinner-value.component.scss']
           })
export class SpinnerValueComponent implements OnInit {

  @Input() pixel: MaskPixel;

  constructor() {
  }

  ngOnInit() {
  }

  plusPixelValue(pixel: MaskPixel): void {
    pixel.value++;
  }

  minusPixelValue(pixel: MaskPixel): void {
    pixel.value--;
  }

}
