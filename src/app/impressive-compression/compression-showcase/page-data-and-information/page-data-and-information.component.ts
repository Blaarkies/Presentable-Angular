import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-page-data-and-information',
  templateUrl: './page-data-and-information.component.html',
  styleUrls: ['../compression-showcase.component.scss']
})
export class PageDataAndInformationComponent implements OnInit {

  @Input() data;
  @Input() charLimit;

  constructor() { }

  ngOnInit() {
  }

}
