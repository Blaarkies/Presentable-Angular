import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-entropy-info',
  templateUrl: './entropy-info.component.html',
  styleUrls: ['./entropy-info.component.css',
    '../../app.component.scss'],
})
export class EntropyInfoComponent implements OnInit {

  @Input('bytes') bytes: number;
  @Input('entropyScore') entropyScore: number;
  @Input('entropyFraction') entropyFraction: number;

  constructor() {
  }

  ngOnInit() {
  }

}
