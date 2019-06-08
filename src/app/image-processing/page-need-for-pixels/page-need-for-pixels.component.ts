import { Component, OnDestroy } from '@angular/core';
import { Image } from 'src/app/image-processing/interfaces/image';
import { PixelProcessorService } from 'src/app/image-processing/pixel-processor.service';
import { interval, of, Subject } from 'rxjs';
import { delay, filter, takeUntil, tap } from 'rxjs/operators';

@Component({
             selector: 'app-intro',
             templateUrl: './page-need-for-pixels.component.html',
             styleUrls: ['./page-need-for-pixels.component.scss']
           })
export class PageNeedForPixelsComponent implements OnDestroy {

  unsubscribe$ = new Subject<void>();

  sourceImage: Image;
  showPixels: boolean;

  filtersSwapIndex = 0;
  userClicked = false;

  constructor(private pixelProcessorService: PixelProcessorService) {
    this.sourceImage = this.pixelProcessorService.getImageFromString(
      `23445553
      34566554
      30246765
      50356766
      41455566
      02455776
      24567755
      45676765`, 7);

    interval(1000 * 7.5)
      .pipe(
        filter(_ => !this.userClicked),
        tap(_ => this.filtersSwapIndex = (this.filtersSwapIndex + 1) % 5),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
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
