import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss',
    '../../app.component.scss']
})
export class DashboardComponent implements OnInit {

  public cards = [];

  constructor(private router: Router) {
    // this.cards.push({title: 'Parser Expression Grammar', subtitle: 'by Pierre Roux', data: ''});
    // this.cards.push({title: 'Annotations in TypeScript', subtitle: 'by Pierre Roux', data: 'annotations-in-typescript'});
    // this.cards.push({title: 'AutoHotkey', subtitle: 'by Pierre Roux', data: ''});
    this.cards.push({title: 'Compression Crash Course', subtitle: 'by Pierre Roux', data: 'compression-crash-course'});
  }

  ngOnInit() {
  }

  public goToRoute(route: string) {
    this.router.navigate([route]);
  }

}

// <app-page-data-and-information [data]="data" [charLimit]="charLimit"></app-page-data-and-information>
