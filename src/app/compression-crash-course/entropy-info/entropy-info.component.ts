import { Component, Input, OnInit } from '@angular/core';
import { EntropyExample } from 'src/app/common/interface';
import { TitleService } from 'src/app/title.service';

@Component({
             selector: 'app-entropy-info',
             templateUrl: './entropy-info.component.html',
             styleUrls: ['./entropy-info.component.scss'],
           })
export class EntropyInfoComponent implements OnInit {

  @Input() entropyObject: EntropyExample;

  isPresentation = false;

  constructor(private titleService: TitleService) {
    this.isPresentation = this.titleService.isPresentation;
  }

  ngOnInit() {
  }

}
