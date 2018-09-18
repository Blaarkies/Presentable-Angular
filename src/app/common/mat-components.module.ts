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
              WebsiteInfoDialogComponent
            ],
            declarations: [ProgressBarComponent, TutorialDialogComponent, WebsiteInfoDialogComponent]
          })
export class MatComponentsModule {
}
