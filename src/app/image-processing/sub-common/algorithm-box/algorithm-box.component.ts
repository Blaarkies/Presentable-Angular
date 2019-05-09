import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
             selector: 'app-algorithm-box',
             templateUrl: './algorithm-box.component.html',
             styleUrls: ['./algorithm-box.component.scss']
           })
export class AlgorithmBoxComponent implements OnInit {

  @Input() title;
  @Input() inputA;
  @Input() inputB;
  @Input() calculation;
  @Input() output;
  @Output() complete = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit() {
  }

  onCompleteDestinationImage() {
    this.complete.emit();
  }
}
