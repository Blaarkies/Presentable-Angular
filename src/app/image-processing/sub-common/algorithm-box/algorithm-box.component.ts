import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
             selector: 'app-algorithm-box',
             templateUrl: './algorithm-box.component.html',
             styleUrls: ['./algorithm-box.component.scss']
           })
export class AlgorithmBoxComponent {

  @Input() title;
  @Input() inputA;
  @Input() inputB;
  @Input() calculation;
  @Input() output;
  @Output() complete = new EventEmitter<void>();

  onCompleteDestinationImage() {
    this.complete.emit();
  }
}
