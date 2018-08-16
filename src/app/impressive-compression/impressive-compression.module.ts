import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CompressionShowcaseComponent} from './compression-showcase/compression-showcase.component';
import {MatComponentsModule} from "../common/mat-components.module";
import {EntropyCardComponent} from './entropy-card/entropy-card.component';
import { HuffmanTreeComponent } from './huffman-tree/huffman-tree.component';
import { EntropyInfoComponent } from './entropy-info/entropy-info.component';
import { HuffmanNodeComponent } from './huffman-tree/huffman-node/huffman-node.component';
import { NodeConnecterComponent } from './huffman-tree/huffman-node/node-connecter/node-connecter.component';

@NgModule({
  imports: [
    CommonModule,
    MatComponentsModule,
  ],
  declarations: [CompressionShowcaseComponent, EntropyCardComponent, HuffmanTreeComponent, EntropyInfoComponent, HuffmanNodeComponent, NodeConnecterComponent]
})
export class ImpressiveCompressionModule {
}
