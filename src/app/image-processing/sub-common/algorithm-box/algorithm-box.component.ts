import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Mask, MaskPixel } from 'src/app/image-processing/interfaces/mask';

@Component({
             selector: 'app-algorithm-box',
             templateUrl: './algorithm-box.component.html',
             styleUrls: ['./algorithm-box.component.scss']
           })
export class AlgorithmBoxComponent {

  @Input() title: string;
  @Input() inputA: string;
  @Input() inputB: string;
  @Input() inputC: string;
  @Input() calculation: string;
  @Input() output: string;
  @Input() kernelInputA: Mask = null;
  @Input() kernelInputB: Mask = null;
  @Input() editKernelB = false;

  @Output() complete = new EventEmitter<void>();
  @Output() pixelHover = new EventEmitter<MaskPixel>();

  onCompleteDestinationImage() {
    this.complete.emit();
  }

  onPixelHover(pixel: MaskPixel): void {
    this.pixelHover.emit(pixel);
  }

}
