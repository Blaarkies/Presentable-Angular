import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Image } from 'src/app/image-processing/interfaces/image';
import { PixelProcessorService } from 'src/app/image-processing/pixel-processor.service';
import { interval, of, Subject } from 'rxjs';
import { delay, filter, takeUntil, tap } from 'rxjs/operators';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
             selector: 'app-intro',
             templateUrl: './page-need-for-pixels.component.html',
             styleUrls: ['./page-need-for-pixels.component.scss']
           })
export class PageNeedForPixelsComponent implements OnDestroy {

  @ViewChild('tabGroup') tabGroup: MatTabGroup;

  unsubscribe$ = new Subject<void>();

  sourceImage: Image;
  showPixels: boolean;
  filtersSwapIndex = 0;

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

    this.rollTabs();
  }

  private rollTabs() {
    interval(1000 * 10)
      .pipe(
        tap(_ => {
          this.filtersSwapIndex = (this.filtersSwapIndex + 1) % 5;
          if (this.filtersSwapIndex == 0) {
            this.unsubscribe$.next();
          }
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }

  userClickTab(): void {
    this.unsubscribe$.next();

    of(null)
      .pipe(delay(1000 * 30), takeUntil(this.unsubscribe$))
      .subscribe(_ => {
        this.filtersSwapIndex = this.tabGroup.selectedIndex;
        this.rollTabs();
      });
  }

}
