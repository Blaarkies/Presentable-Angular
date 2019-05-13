import { Injectable } from '@angular/core';
import { clone, getLinesOfTextSplitByNumber } from '../../common/utils';
import { EntropyExample, JsonAsset } from 'src/app/common/interfaces';
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
    data = clone(data);
    data.text = data.text.substring(52, 52+44);
    let huffmanCoding = clone(this.compression.getProcessedEntropy(data));
    huffmanCoding.binary = this.compression.textToBinaryContainer(huffmanCoding.text.toLowerCase());
    huffmanCoding.tree = this.compression.getHuffmanTree(huffmanCoding.text.toLowerCase());
    huffmanCoding.encodedArray = this.compression.getHuffmanEncodedContainer(huffmanCoding.text.toLowerCase(),
                                                                    huffmanCoding.tree);
    huffmanCoding.table = this.compression.getHuffmanDictionary(huffmanCoding.tree).reverse();
    huffmanCoding.lines = getLinesOfTextSplitByNumber(huffmanCoding.text, 60);

    return huffmanCoding;
  }
}
