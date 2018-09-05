import { Injectable } from '@angular/core';
import { clone, getTextSplitByNumber } from '../../common/utils';
import { EntropyExample, JsonAsset } from '../../common/interface';
import { CompressionProcessorService } from '../compression-processor.service';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
              providedIn: 'root'
            })
export class CompressionShowcaseService {

  data: Observable<JsonAsset>;
  charLimit = 400;

  constructor(private compression: CompressionProcessorService,
              private http: HttpClient) {
    this.data = <Observable<JsonAsset>>this.http
                                           .get('assets/compression-data.json')
                                           .pipe(shareReplay());
    this.data.subscribe();
  }

  getHuffmanCodingPageData(data: EntropyExample) {
    data.text = data.text.substring(0, 96);
    let huffmanCoding = clone(this.compression.getProcessedEntropy(data));
    huffmanCoding.text = huffmanCoding.text.substring(0, 96);
    huffmanCoding.binary = this.compression.textToBinary(huffmanCoding.text);
    huffmanCoding.tree = this.compression.getHuffmanTree(huffmanCoding.text.toLowerCase());
    huffmanCoding.encodedArray = this.compression.getHuffmanEncoded(huffmanCoding.text.toLowerCase(),
                                                                    huffmanCoding.tree);
    huffmanCoding.table = this.compression.getHuffmanDictionary(huffmanCoding.tree)
                              .map(hc => {
                                if (hc.char === ' ') {
                                  hc.char = '⎵';
                                }
                                if (hc.index === '10') {
                                  hc.char = '¶';
                                }
                                return hc;
                              })
                              .reverse();
    huffmanCoding.lines = getTextSplitByNumber(huffmanCoding.text, 60);

    return huffmanCoding;
  }
}
