import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNeedForPixelsComponent } from 'src/app/image-processing/page-need-for-pixels/page-need-for-pixels.component';
import { MatComponentsModule } from 'src/app/common/mat-components.module';
import { PagePixelManipulationComponent } from './page-pixel-manipulation/page-pixel-manipulation.component';

@NgModule({
            imports: [
              CommonModule,
              MatComponentsModule,
            ],
            declarations: [PageNeedForPixelsComponent, PagePixelManipulationComponent]
          })
export class ImageProcessingModule {
}
