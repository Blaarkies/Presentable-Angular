import { Component, OnInit } from '@angular/core';
import { AsciiImage, EntropyExample } from 'src/app/common/interfaces';
import { CompressionProcessorService } from '../../compression-processor.service';
import { CompressionShowcaseService } from 'src/app/compression-crash-course/compression-showcase/compression-showcase.service';

@Component({
             selector: 'app-page-run-length-encoding',
             templateUrl: './page-run-length-encoding.component.html',
             styleUrls: ['./page-run-length-encoding.component.scss']
           })
export class PageRunLengthEncodingComponent implements OnInit {

  runLengthImage: AsciiImage;
  selectedRunLengthId: number;
  runLengthImageEntropy: EntropyExample;
  showEncoded: boolean = false;

  constructor(private dataService: CompressionShowcaseService,
              private compression: CompressionProcessorService) {
  }

  ngOnInit() {
    this.dataService.data.subscribe(data => this.initData(data.asciiImage));
  }

  private initData(data: AsciiImage) {
    this.runLengthImage = this.getRunLengthEncoding(data);
    this.runLengthImageEntropy = this.compression.getProcessedEntropy(<EntropyExample>{text: this.runLengthImage.text});
  }

  getRunLengthEncoding(image: AsciiImage): AsciiImage {
    image.lines = this.compression.getRunLengthFlaggedAndSplit(image.text, image.width);
    image.encoded = this.compression.getRunLengthFlaggedEncoded(image.text);
    return image;
  }

}
