import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { PageDataAndInformationComponent } from '../compression-crash-course/compression-showcase/page-data-and-information/page-data-and-information.component';
import { PageDataWithoutPatternComponent } from '../compression-crash-course/compression-showcase/page-data-without-pattern/page-data-without-pattern.component';
import { PageRunLengthEncodingComponent } from '../compression-crash-course/compression-showcase/page-run-length-encoding/page-run-length-encoding.component';
import { PageHuffmanCodingTreeComponent } from 'src/app/compression-crash-course/compression-showcase/page-huffman-coding-tree/page-huffman-coding-tree.component';
import { PageHuffmanCodingEncodeComponent } from 'src/app/compression-crash-course/compression-showcase/page-huffman-coding-encode/page-huffman-coding-encode.component';
import { PageLempelZivWelchComponent } from 'src/app/compression-crash-course/compression-showcase/page-lempel-ziv-welch/page-lempel-ziv-welch.component';
import { PageQuestionsComponent } from 'src/app/common/page-questions/page-questions.component';
import { PageInRealLifeCompressionComponent } from 'src/app/compression-crash-course/compression-showcase/page-in-real-life-compression/page-in-real-life-compression.component';
import { PageSummaryCompressionComponent } from 'src/app/compression-crash-course/compression-showcase/page-summary-compression/page-summary-compression.component';
import { PageNeedForPixelsComponent } from 'src/app/image-processing/page-need-for-pixels/page-need-for-pixels.component';
import { PagePixelManipulationComponent } from 'src/app/image-processing/page-pixel-manipulation/page-pixel-manipulation.component';
import { PageMaskBlurComponent } from 'src/app/image-processing/page-mask-blur/page-mask-blur.component';
import { PageCustomMasksComponent } from 'src/app/image-processing/page-custom-masks/page-custom-masks.component';
import { PageMaskSharpenComponent } from 'src/app/image-processing/page-mask-sharpen/page-mask-sharpen.component';
import { PageInRealLifeImagesComponent } from 'src/app/image-processing/page-in-real-life-images/page-in-real-life-images.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {title: 'Presentable Angular', image: '../assets/logo-dashboard.jpg'}
  },
  {
    path: 'compression-crash-course',
    data: {title: 'Compression Crash Course', image: '../assets/logo-compression.gif'},
    children: [
      {path: '', redirectTo: 'data-and-information', pathMatch: 'full'},
      {path: 'data-and-information', data: {title: 'Data And Information'}, component: PageDataAndInformationComponent},
      {path: 'data-without-pattern', data: {title: 'Data Without Pattern'}, component: PageDataWithoutPatternComponent},
      {path: 'run-length-encoding', data: {title: 'Run-length Encoding'}, component: PageRunLengthEncodingComponent},
      {path: 'huffman-coding-tree', data: {title: 'Huffman Coding'}, component: PageHuffmanCodingTreeComponent},
      {path: 'huffman-coding-decode', data: {title: 'Huffman Coding'}, component: PageHuffmanCodingEncodeComponent},
      {path: 'lempel-ziv-welch', data: {title: 'Lempel-Ziv-Welch'}, component: PageLempelZivWelchComponent},
      {path: 'in-real-life', data: {title: 'In Real Life'}, component: PageInRealLifeCompressionComponent},
      {path: 'summary', data: {title: 'In Conclusion'}, component: PageSummaryCompressionComponent},
      {path: 'questions', data: {title: 'Questions'}, component: PageQuestionsComponent},
    ]
  },
  {
    path: 'image-processing',
    data: {title: 'An Image Is Worth 1000px', image: '../assets/logo-image-proc.gif'},
    children: [
      {path: '', redirectTo: 'need-for-pixels', pathMatch: 'full'},
      {path: 'need-for-pixels', data: {title: 'The Need For Pixels'}, component: PageNeedForPixelsComponent},
      {path: 'pixel-manipulation', data: {title: 'How To Train Your Pixel'}, component: PagePixelManipulationComponent},
      {path: 'mask-blur', data: {title: 'Blur Between The Lines'}, component: PageMaskBlurComponent},
      {path: 'mask-custom', data: {title: 'The Kernel'}, component: PageCustomMasksComponent},
      {path: 'mask-sharp', data: {title: 'Keeping It Sharp'}, component: PageMaskSharpenComponent},
      {path: 'in-real-life', data: {title: 'In Real Life'}, component: PageInRealLifeImagesComponent},
      {path: 'questions', data: {title: 'Questions'}, component: PageQuestionsComponent},
    ]
  },
  {path: '**', component: DashboardComponent}
];

@NgModule({
            imports: [
              RouterModule.forRoot(routes),
              CommonModule
            ],
            exports: [
              RouterModule
            ],
            declarations: []
          })
export class AppRoutingModule {
}
