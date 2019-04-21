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

  public topics = [];

  constructor(private router: Router,
              private dialog: MatDialog) {
    this.topics.push({title: 'Compression Crash Course', subtitle: 'by Pierre Roux', data: 'compression-crash-course'});
    this.topics.push({title: 'An Image Is Worth 1000px', subtitle: 'by Pierre Roux', data: 'image-processing'});
  }

  ngOnInit() {
  }

  public goToRoute(route: string) {
    this.router.navigate([route]);
  }

}

