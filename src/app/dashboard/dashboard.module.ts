import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatCardModule, MatGridListModule} from "@angular/material";
import {MatComponentsModule} from "../common/mat-components.module";

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatComponentsModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
