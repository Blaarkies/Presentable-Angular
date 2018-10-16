import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

@Component({
             selector: 'app-dashboard',
             templateUrl: './dashboard.component.html',
             styleUrls: ['./dashboard.component.scss',
                         '../../app.component.scss']
           })
export class DashboardComponent implements OnInit {

  public cards = [];

  constructor(private router: Router,
              private dialog: MatDialog) {
    this.cards.push({title: 'Compression Crash Course', subtitle: 'by Pierre Roux', data: 'compression-crash-course'});
  }

  ngOnInit() {
  }

  public goToRoute(route: string) {
    this.router.navigate([route]);
  }

}

