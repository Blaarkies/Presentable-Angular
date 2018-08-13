import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatListModule, MatProgressBarModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule
} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";

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
  ],
  declarations: []
})
export class MatComponentsModule {
}
