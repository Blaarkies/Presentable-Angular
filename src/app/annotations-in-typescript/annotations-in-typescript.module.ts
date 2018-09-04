import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AnnotationsInTypescriptRoutingModule} from './annotations-in-typescript-routing.module';
import {DecoratorShowcaseComponent} from './decorator-showcase/decorator-showcase.component';
import {MatCardModule, MatGridListModule, MatSnackBarModule, MatTabsModule, MatToolbarModule} from '@angular/material';
import {MatComponentsModule} from "../common/mat-components.module";

@NgModule({
  imports: [
    CommonModule,
    AnnotationsInTypescriptRoutingModule,
    MatComponentsModule
  ],
  declarations: [DecoratorShowcaseComponent]
})
export class AnnotationsInTypescriptModule {
}
