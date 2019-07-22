import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FourierComponent } from 'src/app/image-processing/sub-common/sine-wave/sine-wave.component';
import { interval, Subject } from 'rxjs';
import { sample, takeUntil } from 'rxjs/operators';

@Component({
             selector: 'app-sum-waves-dialog',
             templateUrl: './sum-waves-dialog.component.html',
             styleUrls: ['./sum-waves-dialog.component.scss']
           })
export class SumWavesDialogComponent implements OnDestroy {

  @ViewChild('verticalLine') verticalLine: ElementRef;

  waves: FourierComponent[] = [
    new FourierComponent(1, 0.9, 0),
    new FourierComponent(2, 1, Math.PI * 0.25),
  ];
  movementThrottler$ = new Subject<MouseEvent>();
  unsubscribe$ = new Subject<void>();

  constructor(public dialogRef: MatDialogRef<SumWavesDialogComponent>) {
    let updateDuration = 10;
    this.movementThrottler$
        .pipe(sample(interval(updateDuration)), takeUntil(this.unsubscribe$))
        .subscribe(move => this.verticalLine.nativeElement.style.left = `${move.offsetX - 5}px`);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onMoveCursor(move: MouseEvent) {
    this.movementThrottler$.next(move);
  }
}
