import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { interval, Subject } from 'rxjs';
import { sample, takeUntil } from 'rxjs/operators';
import { FourierComponent } from 'src/app/image-processing/sub-common/sine-wave/fourier.component';
import { SineWaveComponent } from 'src/app/image-processing/sub-common/sine-wave/sine-wave.component';

@Component({
             selector: 'app-sum-waves-dialog',
             templateUrl: './sum-waves-dialog.component.html',
             styleUrls: ['./sum-waves-dialog.component.scss']
           })
export class SumWavesDialogComponent implements OnDestroy {

  @ViewChild('firstWave') firstWave: SineWaveComponent;
  @ViewChild('secondWave') secondWave: SineWaveComponent;
  @ViewChild('sumWave') sumWave: SineWaveComponent;

  waves: FourierComponent[] = [
    new FourierComponent(1, 0.9, 0),
    new FourierComponent(2, 1, Math.PI * 0.25),
  ];
  movementThrottler$ = new Subject<MouseEvent>();
  unsubscribe$ = new Subject<void>();
  verticalAt: number;

  constructor(public dialogRef: MatDialogRef<SumWavesDialogComponent>) {
    let updateDuration = 10;
    this.movementThrottler$
        .pipe(sample(interval(updateDuration)), takeUntil(this.unsubscribe$))
        .subscribe(move => {
          this.verticalAt = move.offsetX / move.target.scrollWidth;
          this.verticalAt = this.verticalAt * 1.25 - 0.23;
          this.firstWave.setWave();
          this.secondWave.setWave();
          this.sumWave.setWave();
        });
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
