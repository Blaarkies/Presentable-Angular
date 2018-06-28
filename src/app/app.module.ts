import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from "./app-routing/app-routing.module";
import {DashboardModule} from './dashboard/dashboard.module'
import {AnnotationsInTypescriptModule} from "./annotations-in-typescript/annotations-in-typescript.module";
import {ImpressiveCompressionModule} from "./impressive-compression/impressive-compression.module";
import {MatComponentsModule} from "./common/mat-components.module";
import {HttpClientModule} from "@angular/common/http";

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
    ImpressiveCompressionModule,
    MatComponentsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
