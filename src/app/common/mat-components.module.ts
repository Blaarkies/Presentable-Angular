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
  MatInputModule,
  MatListModule,
  MatProgressBarModule, MatRippleModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { TutorialDialogComponent } from './tutorial-dialog/tutorial-dialog.component';
import { WebsiteInfoDialogComponent } from './website-info-dialog/website-info-dialog.component';
import { WebsiteInfoComponent } from './website-info/website-info.component';
import { FeedbackDialogComponent } from 'src/app/common/feedback-dialog/feedback-dialog.component';
import { ToggleSliderComponent } from './toggle-slider/toggle-slider.component';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';
import { ButtonIconFabComponent } from './button-icon-fab/button-icon-fab.component';

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
              MatSliderModule,
              MatIconModule,
              MatDialogModule,
              MatSlideToggleModule,
              MatInputModule,
              MatRippleModule,
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
              MatSliderModule,
              MatIconModule,
              MatDialogModule,
              MatSlideToggleModule,
              MatInputModule,
              ProgressBarComponent,
              WebsiteInfoComponent,
              ToggleSliderComponent,
              ButtonIconFabComponent,
            ],
            entryComponents: [
              TutorialDialogComponent,
              WebsiteInfoDialogComponent,
              FeedbackDialogComponent,
              SettingsDialogComponent,
            ],
            declarations: [
              ProgressBarComponent,
              TutorialDialogComponent,
              WebsiteInfoDialogComponent,
              WebsiteInfoComponent,
              FeedbackDialogComponent,
              ToggleSliderComponent,
              SettingsDialogComponent,
              ButtonIconFabComponent,
            ]
          })
export class MatComponentsModule {
}
