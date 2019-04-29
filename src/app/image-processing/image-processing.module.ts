import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNeedForPixelsComponent } from 'src/app/image-processing/page-need-for-pixels/page-need-for-pixels.component';
import { MatComponentsModule } from 'src/app/common/mat-components.module';
import { PagePixelManipulationComponent } from './page-pixel-manipulation/page-pixel-manipulation.component';
import { PageMaskBlurComponent } from './page-mask-blur/page-mask-blur.component';
import { ImageDisplayComponent } from './sub-common/image-display/image-display.component';
import { AlgorithmBoxComponent } from './sub-common/algorithm-box/algorithm-box.component';
import { PageCustomMasksComponent } from './page-custom-masks/page-custom-masks.component';
import { SpinnerValueComponent } from './sub-common/spinner-value/spinner-value.component';

@NgModule({
            imports: [
              CommonModule,
              MatComponentsModule,
            ],
            declarations: [PageNeedForPixelsComponent,
                           PagePixelManipulationComponent,
                           PageMaskBlurComponent,
                           ImageDisplayComponent,
                           AlgorithmBoxComponent,
                           PageCustomMasksComponent,
                           SpinnerValueComponent]
          })
export class ImageProcessingModule {
}
