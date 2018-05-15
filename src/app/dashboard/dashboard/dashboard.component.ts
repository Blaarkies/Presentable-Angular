import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

interface RouteCard {
  title: string;
  subtitle: string;
  route: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public options = <RouteCard[]>[];

  constructor(private router: Router) {
    this.options.push({title: 'Parser Expression Grammar', subtitle: 'by Pierre Roux', route: ''});
    this.options.push({title: 'Annotations in TypeScript', subtitle: 'by Pierre Roux', route: 'annotations-in-typescript'});
    this.options.push({title: 'AutoHotkey', subtitle: 'by Pierre Roux', route: ''});
  }

  ngOnInit() {
  }

  public goToRoute(route: string) {
    this.router.navigate([route]);
  }

}
