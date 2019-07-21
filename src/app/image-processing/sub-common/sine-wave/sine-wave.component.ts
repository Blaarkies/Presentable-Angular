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
  @Input() isSumWave: boolean = false;

  @Input() fourierComponents: FourierComponent[] = [];

  ngAfterViewInit(): void {
    this.setWave();
  }

  private setWave() {
    let canvas: HTMLCanvasElement = this.waveCanvas.nativeElement;
    if (canvas == null || !canvas.getContext) {
      return;
    }
    const ctx = canvas.getContext('2d');

    let graphLabelWidth = 50;
    let graphWidth = canvas.width - graphLabelWidth;
    let displayFraction = 0.8;
    let displayHeight = canvas.height * displayFraction;
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

    let [outputWave, scale] = this.getOutputWave(sineWaveSamplePoints,
                                                 resolution,
                                                 graphWidth,
                                                 graphLabelWidth,
                                                 displayHeight,
                                                 height,
                                                 canvas);

    this.drawHorizontalCartesian(ctx, graphLabelWidth, canvas);

    ctx.beginPath();
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.strokeStyle;
    outputWave.forEach(([x, y]) => ctx.lineTo(x, y));
    ctx.stroke();

    if (this.fourierComponents.length === 1) {
      this.drawCartesianDetails(ctx, graphLabelWidth, canvas, displayFraction, scale);
    }
  }

  private getOutputWave(sineWaveSamplePoints: number[][][],
                        resolution: number,
                        graphWidth: number,
                        graphLabelWidth: number,
                        displayHeight: number,
                        height: number,
                        canvas: HTMLCanvasElement) {
    let sumWaves;
    let scaleToMaxAmplitude;
    if (this.fourierComponents.length === 1) {
      let list = sineWaveSamplePoints[0];
      scaleToMaxAmplitude = this.getMaxScaleFactor(list);
      sumWaves = sineWaveSamplePoints[0]
        .map(point => [
          point[0],
          point[1] / scaleToMaxAmplitude
        ])
        .map(point => [
          point[0] * graphWidth + graphLabelWidth,
          point[1] * (displayHeight * 0.5) + (height * 0.5)
        ]);
    } else {
      let sumOfAllSamplePoints = getArrayRange(resolution)
        .map((i, index) => sineWaveSamplePoints.map(sineArray => sineArray[index]))
        .map(points => [
          points[0][0],
          points.reduce((sum, c) => sum += c[1], 0)
        ]);
      scaleToMaxAmplitude = this.getMaxScaleFactor(sumOfAllSamplePoints);
      sumWaves = sumOfAllSamplePoints
        .map(point => [
          point[0],
          point[1] / scaleToMaxAmplitude
        ])
        .map(point => [
          point[0] * canvas.width,
          point[1] * (height * 0.5) + (height * 0.5)
        ]);
    }
    return [sumWaves, scaleToMaxAmplitude];
  }

  private getMaxScaleFactor(sumOfAllSamplePoints) {
    return Math.max(...sumOfAllSamplePoints.map(v => Math.abs(v[1])));
  }

  private drawCartesianDetails(ctx,
                               graphLabelWidth: number,
                               canvas: HTMLCanvasElement,
                               displayFraction: number,
                               scaleToMaxAmplitude: number) {
    scaleToMaxAmplitude = Math.round(scaleToMaxAmplitude * 100) / 100;
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'gray';

    let notchGapSize = (1 - displayFraction) * 0.5;
    let notchGapTop = notchGapSize * canvas.height;
    let notchGapBottom = canvas.height - notchGapSize * canvas.height;

    // vertical cartesian
    ctx.beginPath();
    ctx.lineTo(graphLabelWidth, 0);
    ctx.lineTo(graphLabelWidth, canvas.height);
    ctx.stroke();

    // +1 notch
    ctx.beginPath();
    ctx.lineTo(graphLabelWidth + 1, notchGapTop);
    ctx.lineTo(graphLabelWidth + 1 + 5, notchGapTop);

    ctx.stroke();
    // -1 notch
    ctx.beginPath();
    ctx.lineTo(graphLabelWidth + 1, notchGapBottom);
    ctx.lineTo(graphLabelWidth + 1 + 5, notchGapBottom);
    ctx.stroke();

    ctx.font = '32px monospace';
    ctx.fillStyle = 'white';
    ctx.fillText(`${this.fourierComponents[0].frequency}Hz`, 0, 50 + 15, graphLabelWidth);

    ctx.font = '12px monospace';
    ctx.fillStyle = 'white';
    ctx.fillText(scaleToMaxAmplitude, graphLabelWidth - 30, 3 + notchGapTop);
    ctx.fillText(-scaleToMaxAmplitude, graphLabelWidth - 37, 3 + notchGapBottom);
  }

  private drawHorizontalCartesian(ctx, graphLabelWidth: number, canvas: HTMLCanvasElement) {
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'gray';
    ctx.beginPath();
    ctx.lineTo(graphLabelWidth, canvas.height * 0.5);
    ctx.lineTo(canvas.width, canvas.height * 0.5);
    ctx.stroke();
  }
}
