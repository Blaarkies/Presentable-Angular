import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
             selector: 'app-intro',
             templateUrl: './intro.component.html',
             styleUrls: ['./intro.component.scss']
           })
export class IntroComponent implements OnInit, OnDestroy {


  intervalHandles = [];
  transformNumber: number = 1;

  constructor() {
    this.intervalHandles.push(setInterval(() => this.transformNumber = this.transformNumber + 1 % 50, 1000));
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.intervalHandles.forEach(ih => clearInterval(ih));
  }

}
