import {Component} from '@angular/core';
import {ActivatedRoute, Router, RoutesRecognized} from "@angular/router";
import {filter, map} from "rxjs/operators";
import {DomSanitizer, SafeStyle} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  currentRoute: string;
  currentImage: SafeStyle;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private sanitizer: DomSanitizer) {

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
  }


}
