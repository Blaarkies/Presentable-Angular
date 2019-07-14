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
import { PageMaskMedianComponent } from 'src/app/image-processing/page-mask-median/page-mask-median.component';
import { FourierFullScreenDialogComponent } from 'src/app/image-processing/page-in-real-life-images/fourier-full-screen-dialog/fourier-full-screen-dialog.component';
import { SeeingWifiDialogComponent } from 'src/app/image-processing/page-in-real-life-images/seeing-wifi-dialog/seeing-wifi-dialog.component';
import { FullscreenDualImageDialogComponent } from 'src/app/image-processing/sub-common/fullscreen-dual-image-dialog/fullscreen-dual-image-dialog.component';

@NgModule({
            imports: [
              CommonModule,
              MatComponentsModule,
            ],
            declarations: [
              PageNeedForPixelsComponent,
              PagePixelManipulationComponent,
              PageMaskBlurComponent,
              PageCustomMasksComponent,
              PageMaskMedianComponent,
              PageMaskSharpenComponent,
              PageInRealLifeImagesComponent,
              ImageDisplayComponent,
              AlgorithmBoxComponent,
              MaskEditorComponent,
              FourierFullScreenDialogComponent,
              SeeingWifiDialogComponent,
              FullscreenDualImageDialogComponent,
            ],
            entryComponents: [
              FourierFullScreenDialogComponent,
              SeeingWifiDialogComponent,
              FullscreenDualImageDialogComponent,
            ]
          })
export class ImageProcessingModule {
}
