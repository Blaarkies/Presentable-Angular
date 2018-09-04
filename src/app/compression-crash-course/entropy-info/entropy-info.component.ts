import { Component, Input, OnInit } from '@angular/core';
import { EntropyExample } from 'src/app/common/interface';

@Component({
             selector: 'app-entropy-info',
             templateUrl: './entropy-info.component.html',
             styleUrls: ['./entropy-info.component.scss'],
           })
export class EntropyInfoComponent implements OnInit {

  @Input() entropyObject: EntropyExample;

  constructor() {
  }

  ngOnInit() {
  }

}
