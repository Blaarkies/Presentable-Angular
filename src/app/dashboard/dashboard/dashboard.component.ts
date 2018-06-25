import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {InfoCard} from "../../common/interface";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css',
    '../../app.component.css']
})
export class DashboardComponent implements OnInit {

  public cards = <InfoCard[]>[];

  constructor(private router: Router) {
    this.cards.push({title: 'Parser Expression Grammar', subtitle: 'by Pierre Roux', data: ''});
    this.cards.push({title: 'Annotations in TypeScript', subtitle: 'by Pierre Roux', data: 'annotations-in-typescript'});
    this.cards.push({title: 'AutoHotkey', subtitle: 'by Pierre Roux', data: ''});
    this.cards.push({title: 'Impressive Compression', subtitle: 'by Pierre Roux', data: 'impressive-compression'});
  }

  ngOnInit() {
  }

  public goToRoute(route: string) {
    this.router.navigate([route]);
  }

}
