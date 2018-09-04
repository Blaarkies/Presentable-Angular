import { Component } from '@angular/core';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Location } from '@angular/common';

interface RouteData {
  title: string;
  image?: string;
}

@Component({
             selector: 'app-root',
             templateUrl: './app.component.html',
             styleUrls: ['./app.component.scss']
           })
export class AppComponent {

  currentShowcase: string;
  currentImage: SafeStyle;
  pageTitle: string;

  constructor(private route: ActivatedRoute,
              public router: Router,
              private location: Location,
              private sanitizer: DomSanitizer) {
    this.router.events
        .pipe(
          filter(event => event instanceof RoutesRecognized),
          map((event: RoutesRecognized) => event.state.root.firstChild)
        )
        .subscribe(parentRoute => {
          let parentRouteData = <RouteData>parentRoute.data;
          this.currentShowcase = parentRouteData['title'];
          this.currentImage = this.sanitizer.bypassSecurityTrustStyle(`url(${parentRouteData.image})`);
          this.pageTitle = '';

          if (parentRoute.firstChild) {
            let childRouteData = <RouteData>(parentRoute.firstChild.data);
            if (childRouteData.title) {
              this.pageTitle = childRouteData.title;
            }
          }
        });
  }


  pageForward() {
    let {children, parentPage, nowIdx} = this.getNowRouteInfo();

    let newIdx = nowIdx + 1;
    if (children[newIdx] !== undefined) {
      this.router.navigate([parentPage, children[newIdx].path]);
    } else {
    }
  }

  pageBackward() {
    let {children, parentPage, nowIdx} = this.getNowRouteInfo();

    let newIdx = nowIdx - 1;
    if (children[newIdx] !== undefined && children[newIdx].path !== '') {
      this.router.navigate([parentPage, children[newIdx].path]);
    } else {
    }
  }

  private getNowRouteInfo() {
    let nowSnapshot = this.router.routerState.snapshot;
    let children = nowSnapshot.root.children[0].routeConfig.children;
    let parentPage = nowSnapshot.url
                                .split('/')
                                .reverse()[1];
    let nowPage = nowSnapshot.url
                             .split('/')
                             .reverse()[0];
    let nowIdx = nowSnapshot.root.children[0].routeConfig.children
                                             .findIndex(c => c.path === nowPage);
    return {children, parentPage, nowIdx};
  }

}
