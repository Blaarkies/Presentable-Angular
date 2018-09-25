import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { filter, map, takeUntil } from 'rxjs/operators';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';

interface RouteData {
  title: string;
  image?: string;
}

@Component({
             selector: 'app-root',
             templateUrl: './app.component.html',
             styleUrls: ['./app.component.scss']
           })
export class AppComponent implements OnDestroy, OnInit {

  currentShowcase: string;
  currentImage: SafeStyle;
  pageTitle: string;
  forwardButtonDisabled: boolean;
  backwardButtonDisabled: boolean;

  unsubscribe$ = new Subject<void>();
  isTutorialMode: boolean = false;

  constructor(private route: ActivatedRoute,
              public router: Router,
              private location: Location,
              private sanitizer: DomSanitizer) {
    this.router.events
        .pipe(filter(event => event instanceof NavigationEnd),
              takeUntil(this.unsubscribe$))
        .subscribe(() => {
          let newRouteValue = this.getNowRouteInfo();
          if (newRouteValue) {
            this.updateRouteButtonDisabled();
          }
        });

    this.router.events
        .pipe(
          filter(event => event instanceof RoutesRecognized),
          map((event: RoutesRecognized) => event.state.root.firstChild),
          takeUntil(this.unsubscribe$)
        )
        .subscribe(parentRoute => {
          let parentRouteData = <RouteData>parentRoute.data;
          this.currentShowcase = parentRouteData.title;
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

  pageBackward() {
    this.routeIfPossible(-1);
  }

  pageForward() {
    this.routeIfPossible(+1);
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
    if (nowSnapshot.root.children[0].routeConfig.children === undefined) {
      return;
    }
    let nowIdx = nowSnapshot.root.children[0].routeConfig.children
                                             .findIndex(c => c.path === nowPage);
    return {children, parentPage, nowIdx};
  }

  private isRoutePossible(modifier: number) {
    let {children, nowIdx} = this.getNowRouteInfo();

    let newIdx = nowIdx + modifier;
    return children[newIdx] !== undefined && children[newIdx].path !== '';
  }

  private routeIfPossible(modifier: number) {
    let {children, parentPage, nowIdx} = this.getNowRouteInfo();

    if (this.isRoutePossible(modifier)) {
      this.router
          .navigate([parentPage, children[nowIdx + modifier].path])
          .then(() => this.updateRouteButtonDisabled());
    }
  }

  private updateRouteButtonDisabled() {
    this.backwardButtonDisabled = !this.isRoutePossible(-1);
    this.forwardButtonDisabled = !this.isRoutePossible(+1);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }

  ngOnInit(): void {
  }

}
