import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnnotationsInTypescriptRoutingModule } from './annotations-in-typescript-routing.module';
import { DecoratorShowcaseComponent } from './decorator-showcase/decorator-showcase.component';

@NgModule({
  imports: [
    CommonModule,
    AnnotationsInTypescriptRoutingModule
  ],
  declarations: [DecoratorShowcaseComponent]
})
export class AnnotationsInTypescriptModule { }
