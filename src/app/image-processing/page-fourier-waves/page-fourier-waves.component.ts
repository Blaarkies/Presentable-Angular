import { Component, OnInit, ViewChild } from '@angular/core';
import { Image, Pixel } from 'src/app/image-processing/interfaces/image';
import { PixelProcessorService } from 'src/app/image-processing/pixel-processor.service';
import { Subject } from 'rxjs';
import { Mask } from 'src/app/image-processing/interfaces/mask';
import { getXYFromIndex } from 'src/app/common/utils';
import { FourierComponent } from 'src/app/image-processing/sub-common/sine-wave/sine-wave.component';
import { ImageDisplayComponent } from 'src/app/image-processing/sub-common/image-display/image-display.component';

@Component({
             selector: 'app-page-fourier-waves',
             templateUrl: './page-fourier-waves.component.html',
             styleUrls: ['./page-fourier-waves.component.scss']
           })
export class PageFourierWavesComponent implements OnInit {

  @ViewChild('source') imageDisplayer: ImageDisplayComponent;

  unsubscribe$ = new Subject<void>();

  sourceImage: Image;

  rowMask: Mask;
  selectedRow: number;
  pixelsToDisplay: Pixel[];
  fourierComponents: FourierComponent[] = [];
  bulletNumber: number = 1;

  constructor(private pixelProcessorService: PixelProcessorService) {
    // This is the character "e"
    this.sourceImage = this.pixelProcessorService.getImageFromString(
      `12365422
      23543462
      25322253
      36222363
      36277642
      25221211
      12532342
      11265522`, 7);

    this.rowMask = this.pixelProcessorService.getMaskFromString(`111111111111111`);
  }

  ngOnInit(): void {
    setTimeout(_ => this.setSelectedRowAsFourierInput(this.sourceImage.pixels[9]), 100);
  }

  setSelectedRowAsFourierInput(pixel: Pixel) {
    this.imageDisplayer.setMaskVisibility(pixel, true);


    let imageWidth = this.sourceImage.imageWidth;
    this.selectedRow = getXYFromIndex(imageWidth, pixel.index)[1];
    this.pixelsToDisplay = this.sourceImage.pixels
                               .slice(this.selectedRow * imageWidth, (this.selectedRow + 1) * imageWidth);

    this.fourierComponents = null;
    let reals = this.pixelsToDisplay.map(p => p.value);

    setTimeout(() => {
      let transform = Fourier.Transform(reals);
      let cycles = Fourier.getCyclesFromData(transform);

      this.fourierComponents = cycles
        .map(c => new FourierComponent(c.freq, c.amp, c.phase * (Math.PI / 180)));
    });
  }
}


let Fourier: any = {};

Fourier.Transform = function (data) {
  var N = data.length;
  var frequencies = [];

  // for every frequency...
  for (var freq = 0; freq < N; freq++) {
    var re = 0;
    var im = 0;

    // for every point in time...
    for (var t = 0; t < N; t++) {

      // Spin the signal _backwards_ at each frequency (as radians/s, not Hertz)
      var rate = -1 * (2 * Math.PI) * freq;

      // How far around the circle have we gone at time=t?
      var time = t / N;
      var distance = rate * time;

      // datapoint * e^(-i*2*pi*f) is complex, store each part
      var re_part = data[t] * Math.cos(distance);
      var im_part = data[t] * Math.sin(distance);

      // add this data point's contribution
      re += re_part;
      im += im_part;
    }

    // Close to zero? You're zero.
    if (Math.abs(re) < 1e-10) {
      re = 0;
    }
    if (Math.abs(im) < 1e-10) {
      im = 0;
    }

    // Average contribution at this frequency
    re = re / N;
    im = im / N;

    frequencies[freq] = {
      re: re,
      im: im,
      freq: freq,
      amp: Math.sqrt(re * re + im * im),
      phase: Math.atan2(im, re) * 180 / Math.PI     // in degrees
    };
  }

  return frequencies;
};

Fourier.getCyclesFromData = function (data, rounding) {
  rounding = rounding || 2;
  return data.map(function (i) {
    return {
      freq: i.freq,
      phase: Math.round(i.phase * Math.pow(10, 1)) / Math.pow(10, 1),
      amp: Math.round(i.amp * Math.pow(10, rounding)) / Math.pow(10, rounding)
    };
  });
};

// return time series of data points {x, real, im, amp}
Fourier.InverseTransform = function (cycles) {
  var timeseries = [];
  var len = cycles.length;
  for (var i = 0; i < len; i++) {
    var pos = i / len * 2 * Math.PI;
    var total = Fourier.totalValue(pos, cycles);
    timeseries.push(total);
  }
  return timeseries;
};

// return data point for all cycles {x, real, im, amp}
Fourier.totalValue = function (x, cycles) {
  var real = 0;
  var im = 0;

  cycles.forEach(function (cycle) {
    real += cycle.amp * Math.cos(x * cycle.freq + cycle.phase * Math.PI / 180);
    im += cycle.amp * Math.sin(x * cycle.freq + cycle.phase * Math.PI / 180);
  });

  return {
    x: x,
    real: real,
    im: im,
    amp: Math.sqrt(real * real + im * im)
  };
};
