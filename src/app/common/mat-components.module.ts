import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatProgressBarModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { TutorialDialogComponent } from './tutorial-dialog/tutorial-dialog.component';
import { WebsiteInfoDialogComponent } from './website-info-dialog/website-info-dialog.component';
import { JpegExplainedDialogComponent } from 'src/app/compression-crash-course/compression-showcase/page-in-real-life/jpeg-explained-dialog/jpeg-explained-dialog.component';
import { KeyframesExplainedDialogComponent } from 'src/app/compression-crash-course/compression-showcase/page-in-real-life/keyframes-explained-dialog/keyframes-explained-dialog.component';
import { DevdayTemplateDialogComponent } from 'src/app/compression-crash-course/compression-showcase/page-data-and-information/devday-template-dialog/devday-template-dialog.component';
import { DevdayTemplateEndDialogComponent } from 'src/app/compression-crash-course/compression-showcase/page-questions/devday-template-end-dialog/devday-template-end-dialog.component';

@NgModule({
            imports: [
              CommonModule,
              BrowserModule,
              BrowserAnimationsModule,
              MatTabsModule,
              MatToolbarModule,
              MatCardModule,
              MatGridListModule,
              MatSnackBarModule,
              MatButtonModule,
              MatStepperModule,
              MatTabsModule,
              MatDividerModule,
              MatListModule,
              MatTableModule,
              MatExpansionModule,
              MatProgressBarModule,
              MatTooltipModule,
              MatIconModule,
              MatDialogModule,
              MatSlideToggleModule,
            ],
            exports: [
              CommonModule,
              BrowserModule,
              BrowserAnimationsModule,
              MatTabsModule,
              MatToolbarModule,
              MatCardModule,
              MatGridListModule,
              MatSnackBarModule,
              MatButtonModule,
              MatStepperModule,
              MatTabsModule,
              MatDividerModule,
              MatListModule,
              MatTableModule,
              MatExpansionModule,
              MatProgressBarModule,
              MatTooltipModule,
              MatIconModule,
              MatDialogModule,
              MatSlideToggleModule,
              ProgressBarComponent,
            ],
            entryComponents: [
              TutorialDialogComponent,
              WebsiteInfoDialogComponent,
              JpegExplainedDialogComponent,
              KeyframesExplainedDialogComponent,
              DevdayTemplateDialogComponent,
              DevdayTemplateEndDialogComponent,
            ],
            declarations: [
              ProgressBarComponent,
              TutorialDialogComponent,
              WebsiteInfoDialogComponent,
              JpegExplainedDialogComponent,
              KeyframesExplainedDialogComponent,
              DevdayTemplateDialogComponent,
              DevdayTemplateEndDialogComponent,
            ]
          })
export class MatComponentsModule {
}
