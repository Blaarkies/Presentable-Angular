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
import { PageQuestionsComponent } from 'src/app/compression-crash-course/compression-showcase/page-questions/page-questions.component';
import { PageInRealLifeComponent } from 'src/app/compression-crash-course/compression-showcase/page-in-real-life/page-in-real-life.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {title: 'Presentable Angular', image: '../assets/logo-dashboard.jpg'}
  },
  // {
  //   path: 'annotations-in-typescript',
  //   component: DecoratorShowcaseComponent,
  //   data: {title: "Annotations in TypeScript", image: '../assets/logo-typescript.png'}
  // },
  {
    path: 'compression-crash-course',
    data: {title: 'Compression Crash Course', image: '../assets/logo-compression.gif'},
    children: [
      {path: '', redirectTo: 'data-and-information', pathMatch: 'full'},
      {path: 'data-and-information', data: {title: 'Data and Information'}, component: PageDataAndInformationComponent},
      {path: 'data-without-pattern', data: {title: 'Data without pattern'}, component: PageDataWithoutPatternComponent},
      {path: 'run-length-encoding', data: {title: 'Run-length Encoding'}, component: PageRunLengthEncodingComponent},
      {path: 'huffman-coding-tree', data: {title: 'Huffman coding'}, component: PageHuffmanCodingTreeComponent},
      {path: 'huffman-coding-decode', data: {title: 'Huffman coding'}, component: PageHuffmanCodingEncodeComponent},
      {path: 'lempel-ziv-welch', data: {title: 'Lempel-Ziv-Welch'}, component: PageLempelZivWelchComponent},
      {path: 'in-real-life', data: {title: 'In real life'}, component: PageInRealLifeComponent},
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
