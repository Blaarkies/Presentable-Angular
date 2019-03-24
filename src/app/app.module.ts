import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AnnotationsInTypescriptModule } from './annotations-in-typescript/annotations-in-typescript.module';
import { CompressionCrashCourseModule } from './compression-crash-course/compression-crash-course.module';
import { MatComponentsModule } from './common/mat-components.module';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
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
              AnnotationsInTypescriptModule,
              CompressionCrashCourseModule,
              ImageProcessingModule,
              MatComponentsModule,
              HttpClientModule,
              FlexLayoutModule
            ],
            providers: [
              {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}
            ],
            bootstrap: [AppComponent]
          })
export class AppModule {
}
