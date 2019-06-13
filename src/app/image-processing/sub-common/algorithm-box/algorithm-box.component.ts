import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { Mask, MaskPixel } from 'src/app/image-processing/interfaces/mask';

@Component({
             selector: 'app-algorithm-box',
             templateUrl: './algorithm-box.component.html',
             styleUrls: ['./algorithm-box.component.scss']
           })
export class AlgorithmBoxComponent {

  @Input() title: string;
  @Input() inputATemplate: TemplateRef<any>;
  @Input() inputBTemplate: TemplateRef<any>;
  @Input() inputCTemplate: TemplateRef<any>;
  @Input() calculation: string;
  @Input() outputBTemplate: TemplateRef<any>;
  @Input() output: string;

  @Output() complete = new EventEmitter<void>();

  onCompleteDestinationImage() {
    this.complete.emit();
  }

}
