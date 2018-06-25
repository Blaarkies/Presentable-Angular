import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from '../dashboard/dashboard/dashboard.component';
import {CommonModule} from '@angular/common';
import {DecoratorShowcaseComponent} from "../annotations-in-typescript/decorator-showcase/decorator-showcase.component";
import {CompressionShowcaseComponent} from "../impressive-compression/compression-showcase/compression-showcase.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'annotations-in-typescript',
    component: DecoratorShowcaseComponent,
  },
  {
    path: 'impressive-compression',
    component: CompressionShowcaseComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule {
}
