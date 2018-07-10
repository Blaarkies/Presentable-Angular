import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CompressionShowcaseComponent} from './compression-showcase/compression-showcase.component';
import {MatComponentsModule} from "../common/mat-components.module";
import {EntropyCardComponent} from './entropy-card/entropy-card.component';
import { HuffmanTreeComponent } from './huffman-tree/huffman-tree.component';
import { EntropyInfoComponent } from './entropy-info/entropy-info.component';

@NgModule({
  imports: [
    CommonModule,
    MatComponentsModule,
  ],
  declarations: [CompressionShowcaseComponent, EntropyCardComponent, HuffmanTreeComponent, EntropyInfoComponent]
})
export class ImpressiveCompressionModule {
}
