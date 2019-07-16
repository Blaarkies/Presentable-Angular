import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { getArrayRange } from 'src/app/common/utils';

export class FourierComponent {

  frequency: number;
  magnitude: number;
  phase: number;


  constructor(frequency: number, magnitude: number, phase: number) {
    this.frequency = frequency;
    this.magnitude = magnitude;
    this.phase = phase;
  }
}

@Component({
             selector: 'app-sine-wave',
             templateUrl: './sine-wave.component.html',
             styleUrls: ['./sine-wave.component.scss']
           })
export class SineWaveComponent implements AfterViewInit {

  @ViewChild('wave') waveCanvas: ElementRef;

  @Input() strokeStyle: string = 'red';
  @Input() lineWidth: number = 3;
  @Input() cellSize: number = 60;
  @Input() pixelCount: number = 8;

  @Input() fourierComponents: FourierComponent[] = [];

  constructor() {
  }

  ngAfterViewInit(): void {
    this.setWave();
  }

  private setWave() {
    let canvas: HTMLCanvasElement = this.waveCanvas.nativeElement;

    if (canvas == null || !canvas.getContext) {
      return;
    }
    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.lineTo(canvas.width - 10, (canvas.height * 0.5));
    ctx.lineTo(10, (canvas.height * 0.5));
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'gray';
    ctx.stroke();

    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.strokeStyle;

    let lineWidth = ctx.lineWidth;
    let width = canvas.width;
    let displayHeight = canvas.height * 0.8 - lineWidth;
    let height = canvas.height;
    let resolution = 200;

    let sineWaveSamplePoints = this.fourierComponents
                                   .map(com => getArrayRange(resolution)
                                     .map(index => (index / resolution) * com.frequency * Math.PI * 2)
                                     .map((t, index) => [
                                            index / resolution,
                                            -Math.cos(t + com.phase) * com.magnitude
                                          ]
                                     ));

    ctx.beginPath();
    let sumWaves = this.fourierComponents.length === 1
                   ? sineWaveSamplePoints[0].map((point, i, a) => [
        point[0],
        point[1] * (1 / Math.max(...a.map(v => Math.abs(v[1]))))
      ])
                   : getArrayRange(resolution)
                     .map((i, index) => sineWaveSamplePoints.map(sineArray => sineArray[index]))
                     .map(points => [
                       points[0][0],
                       points.reduce((sum, c) => sum += c[1], 0)
                     ])
                     .map((point, i, a) => [
                       point[0],
                       point[1] * (1 / Math.max(...a.map(v => Math.abs(v[1]))))
                     ]);

    sumWaves = sumWaves
      .map(point => [
        point[0] * width,
        point[1] * (displayHeight * 0.5) + (height * 0.5)
      ]);

    sumWaves.forEach(([x, y]) => ctx.lineTo(x, y));
    ctx.stroke();
  }

}
