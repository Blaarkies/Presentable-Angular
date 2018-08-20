import {Component, Input, OnInit} from '@angular/core';
import {AsciiImage, EntropyExample} from "../../../common/interface";
import {CompressionProcessorService} from "../../compression-processor.service";

@Component({
  selector: 'app-page-run-length-encoding',
  templateUrl: './page-run-length-encoding.component.html',
  styleUrls: ['./page-run-length-encoding.component.scss',
    '../compression-showcase.component.scss']
})
export class PageRunLengthEncodingComponent implements OnInit {

  @Input() data: AsciiImage;

  runLengthImage: AsciiImage;
  selectedRunLengthId: number;
  runLengthImageEntropy: EntropyExample;

  constructor(private compression: CompressionProcessorService) {
  }

  ngOnInit() {
    this.runLengthImage = this.getRunLengthEncoding(this.data);
    this.runLengthImageEntropy = this.compression.getProcessedEntropy(<EntropyExample>{text: this.runLengthImage.text});
  }

  getRunLengthEncoding(image: AsciiImage): AsciiImage {
    image.lines = this.compression.getRunLengthFlaggedAndSplit(image.text, image.width);
    image.encoded = this.compression.getRunLengthFlaggedEncoded(image.text);
    return image;
  }

}
