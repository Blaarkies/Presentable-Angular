import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNeedForPixelsComponent } from 'src/app/image-processing/page-need-for-pixels/page-need-for-pixels.component';
import { MatComponentsModule } from 'src/app/common/mat-components.module';
import { PagePixelManipulationComponent } from './page-pixel-manipulation/page-pixel-manipulation.component';
import { PageMaskBlurComponent } from './page-mask-blur/page-mask-blur.component';
import { ImageDisplayComponent } from './sub-common/image-display/image-display.component';
import { AlgorithmBoxComponent } from './sub-common/algorithm-box/algorithm-box.component';
import { PageCustomMasksComponent } from './page-custom-masks/page-custom-masks.component';
import { MaskEditorComponent } from 'src/app/image-processing/sub-common/mask-editor/mask-editor.component';
import { PageMaskSharpenComponent } from './page-mask-sharpen/page-mask-sharpen.component';
import { PageInRealLifeImagesComponent } from './page-in-real-life-images/page-in-real-life-images.component';

@NgModule({
            imports: [
              CommonModule,
              MatComponentsModule,
            ],
            declarations: [
              PageNeedForPixelsComponent,
              PagePixelManipulationComponent,
              PageMaskBlurComponent,
              ImageDisplayComponent,
              AlgorithmBoxComponent,
              PageCustomMasksComponent,
              MaskEditorComponent,
              PageMaskSharpenComponent,
              PageInRealLifeImagesComponent,
            ],
            entryComponents: []
          })
export class ImageProcessingModule {
}
