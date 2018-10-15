import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatComponentsModule } from '../common/mat-components.module';
import { EntropyCardComponent } from './entropy-card/entropy-card.component';
import { HuffmanTreeComponent } from './huffman-tree/huffman-tree.component';
import { EntropyInfoComponent } from './entropy-info/entropy-info.component';
import { HuffmanNodeComponent } from './huffman-tree/huffman-node/huffman-node.component';
import { NodeConnecterComponent } from './huffman-tree/huffman-node/node-connecter/node-connecter.component';
import { PageDataAndInformationComponent } from './compression-showcase/page-data-and-information/page-data-and-information.component';
import { PageDataWithoutPatternComponent } from './compression-showcase/page-data-without-pattern/page-data-without-pattern.component';
import { PageRunLengthEncodingComponent } from './compression-showcase/page-run-length-encoding/page-run-length-encoding.component';
import { PageHuffmanCodingTreeComponent } from './compression-showcase/page-huffman-coding-tree/page-huffman-coding-tree.component';
import { PageHuffmanCodingEncodeComponent } from './compression-showcase/page-huffman-coding-encode/page-huffman-coding-encode.component';
import { PageQuestionsComponent } from './compression-showcase/page-questions/page-questions.component';
import { PageLempelZivWelchComponent } from './compression-showcase/page-lempel-ziv-welch/page-lempel-ziv-welch.component';
import { PageInRealLifeComponent } from './compression-showcase/page-in-real-life/page-in-real-life.component';
import { PageSummaryComponent } from 'src/app/compression-crash-course/compression-showcase/page-summary/page-summary.component';

@NgModule({
            imports: [
              CommonModule,
              MatComponentsModule,
            ],
            declarations: [
              EntropyCardComponent,
              HuffmanTreeComponent,
              EntropyInfoComponent,
              HuffmanNodeComponent,
              NodeConnecterComponent,
              PageDataAndInformationComponent,
              PageDataWithoutPatternComponent,
              PageRunLengthEncodingComponent,
              PageHuffmanCodingTreeComponent,
              PageHuffmanCodingEncodeComponent,
              PageQuestionsComponent,
              PageLempelZivWelchComponent,
              PageInRealLifeComponent,
              PageSummaryComponent
            ]
          })
export class CompressionCrashCourseModule {
}
