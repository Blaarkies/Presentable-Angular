import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompressionShowcaseComponent } from './compression-showcase/compression-showcase.component';
import {MatComponentsModule} from "../common/mat-components.module";

@NgModule({
  imports: [
    CommonModule,
    MatComponentsModule
  ],
  declarations: [CompressionShowcaseComponent]
})
export class ImpressiveCompressionModule { }
