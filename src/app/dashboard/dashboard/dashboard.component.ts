import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { WebsiteInfoDialogComponent } from 'src/app/common/website-info-dialog/website-info-dialog.component';

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

  websiteInfoDialog() {
    // https://github.com/angular/material2/issues/5268
    // TODO: work-around for expression change on dialog factory
    setTimeout(() => {
      this.dialog.open(WebsiteInfoDialogComponent,
                       {
                         width: '50%',
                         data: {}
                       })
          .afterClosed()
          .subscribe();
    });
  }

}

