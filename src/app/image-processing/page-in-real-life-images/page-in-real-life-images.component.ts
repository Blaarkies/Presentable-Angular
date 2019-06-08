import { Component, OnDestroy } from '@angular/core';
import { interval, of, Subject } from 'rxjs';
import { delay, filter, takeUntil, tap } from 'rxjs/operators';

@Component({
             selector: 'app-page-in-real-life-images',
             templateUrl: './page-in-real-life-images.component.html',
             styleUrls: ['./page-in-real-life-images.component.scss']
           })
export class PageInRealLifeImagesComponent implements OnDestroy {

  unsubscribe$ = new Subject<void>();

  logoSwapIndex = 0;
  fourierSwapIndex = 0;
  userClicked = false;
  bulletNumber: number = 1;

  constructor() {
    interval(1000 * 7.5)
      .pipe(
        filter(_ => !this.userClicked),
        tap(_ => this.logoSwapIndex = (this.logoSwapIndex + 1) % 3),
        delay(300),
        tap(_ => this.fourierSwapIndex = (this.fourierSwapIndex + 1) % 4),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();

    setTimeout(_ => this.bulletNumber++, 0);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }

  userClickTab(): void {
    this.userClicked = true;
    of(null)
      .pipe(delay(1000 * 15), takeUntil(this.unsubscribe$))
      .subscribe(_ => this.userClicked = false);
  }
}
