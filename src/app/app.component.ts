import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { filter, map, takeUntil } from 'rxjs/operators';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { RouteData } from 'src/app/interfaces';
import { MatDialog } from '@angular/material';
import { SettingsDialogComponent } from 'src/app/common/settings-dialog/settings-dialog.component';

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

  private _isPresentationMode: boolean;
  get isPresentationMode(): boolean {
    return this._isPresentationMode;
  }

  set isPresentationMode(value: boolean) {
    value
    ? document.body.classList.add('is-presentation-mode')
    : document.body.classList.remove('is-presentation-mode');
    this._isPresentationMode = value;
  }

  constructor(private route: ActivatedRoute,
              public router: Router,
              private location: Location,
              private sanitizer: DomSanitizer,
              private dialog: MatDialog) {
    this.isPresentationMode = JSON.parse(localStorage.getItem('isPresentationMode'));

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

  openSettings() {
    // https://github.com/angular/material2/issues/5268
    // TODO: work-around for expression change on dialog factory
    setTimeout(() => {
      this.dialog.open(SettingsDialogComponent, {
        data: {
          isPresentationMode: this.isPresentationMode
        }
      })
          .afterClosed()
          .pipe(
            filter(settings => settings),
            takeUntil(this.unsubscribe$)
          )
          .subscribe(settings => {
            this.isPresentationMode = settings.isPresentationMode;
            localStorage.setItem('isPresentationMode', JSON.stringify(this.isPresentationMode));
          });
    });
  }
}
