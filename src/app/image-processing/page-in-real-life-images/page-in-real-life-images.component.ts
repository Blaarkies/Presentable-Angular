import { Component, OnDestroy, ViewChild } from '@angular/core';
import { interval, of, Subject } from 'rxjs';
import { delay, takeUntil, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { SeeingWifiDialogComponent } from 'src/app/image-processing/page-in-real-life-images/seeing-wifi-dialog/seeing-wifi-dialog.component';
import { FullscreenUnoImageDialogComponent } from 'src/app/image-processing/sub-common/fullscreen-uno-image-dialog/fullscreen-uno-image-dialog.component';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
             selector: 'app-page-in-real-life-images',
             templateUrl: './page-in-real-life-images.component.html',
             styleUrls: ['./page-in-real-life-images.component.scss']
           })
export class PageInRealLifeImagesComponent implements OnDestroy {

  @ViewChild('logoTabGroup') logoTabGroup: MatTabGroup;
  @ViewChild('astroTabGroup') astroTabGroup: MatTabGroup;

  unsubscribe$ = new Subject<void>();

  logoSwapIndex = 0;
  astroSwapIndex = 0;
  bulletNumber: number = 1;

  constructor(private dialog: MatDialog) {
    this.rollTabs();

    setTimeout(_ => this.bulletNumber++);
  }

  private rollTabs() {
    interval(1000 * 10)
      .pipe(
        tap(_ => this.logoSwapIndex = (this.logoSwapIndex + 1) % 3),
        delay(300),
        tap(_ => {
          this.astroSwapIndex = (this.astroSwapIndex + 1) % 4;

          if (this.logoSwapIndex == 0 || this.astroSwapIndex == 0) {
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
        this.logoSwapIndex = this.logoTabGroup.selectedIndex;
        this.astroSwapIndex = this.astroTabGroup.selectedIndex;
        this.rollTabs();
      });
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

  openComputerVisionDialog() {
    // https://github.com/angular/material2/issues/5268
    // TODO: work-around for expression change on dialog factory
    setTimeout(() => {
      this.dialog.open(FullscreenUnoImageDialogComponent, {
        width: '98%',
        height: '95%',
        data: {
          title: 'Computer Vision',
          styleClass: 'computer-vision'
        }
      })
          .afterClosed()
          .subscribe();
    });
  }

  openObjectRecognitionDialog() {
    // https://github.com/angular/material2/issues/5268
    // TODO: work-around for expression change on dialog factory
    setTimeout(() => {
      this.dialog.open(FullscreenUnoImageDialogComponent, {
        width: '98%',
        height: '95%',
        data: {
          title: 'Object Recognition',
          styleClass: 'object-recognition'
        }
      })
          .afterClosed()
          .subscribe();
    });
  }

  openFaceDetectionDialog() {
    // https://github.com/angular/material2/issues/5268
    // TODO: work-around for expression change on dialog factory
    setTimeout(() => {
      this.dialog.open(FullscreenUnoImageDialogComponent, {
        width: '98%',
        height: '95%',
        data: {
          title: 'Face Detection',
          styleClass: 'face-detection'
        }
      })
          .afterClosed()
          .subscribe();
    });
  }

  openIndoorGpsDialog() {
    // https://github.com/angular/material2/issues/5268
    // TODO: work-around for expression change on dialog factory
    setTimeout(() => {
      this.dialog.open(FullscreenUnoImageDialogComponent, {
        width: '98%',
        height: '95%',
        data: {
          title: 'Indoor positioning system',
          styleClass: 'indoor-gps'
        }
      })
          .afterClosed()
          .subscribe();
    });
  }
}
