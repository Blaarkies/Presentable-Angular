import {Component} from '@angular/core';
import {NavigationStart, Router} from "@angular/router";
import {filter, map} from "rxjs/operators";
import {Routes} from "./common/interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  currentRoute = Routes.main;
  urlRoutes = Routes;

  constructor(private router: Router) {
    router.events
      .pipe(
        filter(e => e instanceof NavigationStart),
        map(e => e as NavigationStart)
      )
      .subscribe(val => this.currentRoute = this.getRouteByUrl(val.url));
  }

  private getRouteByUrl(url: string) {
    switch (url) {
      case '/annotations-in-typescript':
        return Routes.decorators;
      case '/impressive-compression':
        return Routes.compression;
      case '/':
        return Routes.main;
    }
  }

}
