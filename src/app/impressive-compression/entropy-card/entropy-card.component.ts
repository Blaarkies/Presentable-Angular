import {Component, Input, OnInit} from '@angular/core';
import {EntropyExample} from "../../common/interface";

@Component({
  selector: 'app-entropy-card',
  templateUrl: './entropy-card.component.html',
  styleUrls: ['./entropy-card.component.css',
    '../../app.component.css']
})
export class EntropyCardComponent implements OnInit {

  @Input('data') data: EntropyExample;
  @Input('charLimit') charLimit: string;

  constructor() {
  }

  ngOnInit() {
  }

}
