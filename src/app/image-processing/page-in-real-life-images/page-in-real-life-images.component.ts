import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
             selector: 'app-page-in-real-life-images',
             templateUrl: './page-in-real-life-images.component.html',
             styleUrls: ['./page-in-real-life-images.component.scss']
           })
export class PageInRealLifeImagesComponent implements OnInit, OnDestroy {

  logoSwapIndex = 0;
  fourierSwapIndex = 0;

  swapInterval$ = interval(7500);
  unsubscribe = new Subject<void>();

  constructor() {
    this.swapInterval$
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(_ => {
          this.logoSwapIndex = (this.logoSwapIndex + 1) % 3;
          setTimeout(_ => this.fourierSwapIndex = (this.fourierSwapIndex + 1) % 4, 250);
        });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
  }

}
