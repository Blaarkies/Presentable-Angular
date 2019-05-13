import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatComponentsModule } from './common/mat-components.module';
import { HttpClientModule } from '@angular/common/http';

import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CompressionCrashCourseModule } from './compression-crash-course/compression-crash-course.module';
import { ImageProcessingModule } from 'src/app/image-processing/image-processing.module';

@NgModule({
            declarations: [
              AppComponent
            ],
            imports: [
              BrowserModule,
              BrowserAnimationsModule,
              AppRoutingModule,
              DashboardModule,
              CompressionCrashCourseModule,
              ImageProcessingModule,
              MatComponentsModule,
              HttpClientModule,
            ],
            providers: [
              {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}
            ],
            bootstrap: [AppComponent]
          })
export class AppModule {
}
