import {Component} from '@angular/core';
import {ActivatedRoute, Router, RoutesRecognized} from "@angular/router";
import {filter, map} from "rxjs/operators";
import {DomSanitizer, SafeStyle} from "@angular/platform-browser";
import {TitleService} from "./title.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  currentRoute: string;
  currentImage: SafeStyle;
  pageTitle: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private sanitizer: DomSanitizer,
              private titleService: TitleService) {

    this.router.events
      .pipe(
        filter(event => event instanceof RoutesRecognized),
        map((event: RoutesRecognized) => {
          return event.state.root.firstChild.data;
        })
      )
      .subscribe(customData => {
        this.currentRoute = customData['title'];
        this.currentImage = this.sanitizer.bypassSecurityTrustStyle(`url(${customData['image']})`);
      });

    this.titleService.titleChange$.subscribe(newTitle => this.pageTitle = newTitle);
  }


}
