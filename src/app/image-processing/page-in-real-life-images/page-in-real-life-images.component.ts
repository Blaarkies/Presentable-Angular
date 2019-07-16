import { Component, OnDestroy } from '@angular/core';
import { interval, of, Subject } from 'rxjs';
import { delay, filter, takeUntil, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { SeeingWifiDialogComponent } from 'src/app/image-processing/page-in-real-life-images/seeing-wifi-dialog/seeing-wifi-dialog.component';

@Component({
             selector: 'app-page-in-real-life-images',
             templateUrl: './page-in-real-life-images.component.html',
             styleUrls: ['./page-in-real-life-images.component.scss']
           })
export class PageInRealLifeImagesComponent implements OnDestroy {

  unsubscribe$ = new Subject<void>();

  logoSwapIndex = 0;
  astroSwapIndex = 0;
  userClicked = false;
  bulletNumber: number = 1;

  constructor(private dialog: MatDialog) {
    interval(1000 * 10)
      .pipe(
        filter(_ => !this.userClicked),
        tap(_ => this.logoSwapIndex = (this.logoSwapIndex + 1) % 3),
        delay(300),
        tap(_ => this.astroSwapIndex = (this.astroSwapIndex + 1) % 4),
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
      .pipe(delay(1000 * 60), takeUntil(this.unsubscribe$))
      .subscribe(_ => this.userClicked = false);
  }

  openSeeingWifiDialog() {
    // https://github.com/angular/material2/issues/5268
    // TODO: work-around for expression change on dialog factory
    setTimeout(() => {
      this.dialog.open(SeeingWifiDialogComponent, {width: '98%', height: '95%'})
          .afterClosed()
          .subscribe();
    });
  }
}
