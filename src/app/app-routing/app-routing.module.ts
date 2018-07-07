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
    data: {title: "Presentable Angular and Knowledge Repositories", image: '../assets/logo-dashboard.jpg'}
  },
  {
    path: 'annotations-in-typescript',
    component: DecoratorShowcaseComponent,
    data: {title: "Annotations in TypeScript", image: '../assets/logo-typescript.png'}
  },
  {
    path: 'impressive-compression',
    component: CompressionShowcaseComponent,
    data: {title: "Impressive compression", image: '../assets/logo-compression.gif'}
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
