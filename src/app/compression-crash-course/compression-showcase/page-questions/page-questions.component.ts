import { Component, OnInit } from '@angular/core';
import { WebsiteInfoDialogComponent } from 'src/app/common/website-info-dialog/website-info-dialog.component';
import { MatDialog } from '@angular/material';
import { DevdayTemplateDialogComponent } from 'src/app/compression-crash-course/compression-showcase/page-data-and-information/devday-template-dialog/devday-template-dialog.component';
import { DevdayTemplateEndDialogComponent } from 'src/app/compression-crash-course/compression-showcase/page-questions/devday-template-end-dialog/devday-template-end-dialog.component';

@Component({
             selector: 'app-page-questions',
             templateUrl: './page-questions.component.html',
             styleUrls: ['./page-questions.component.scss']
           })
export class PageQuestionsComponent implements OnInit {

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
    this.openDevdayDialog();
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

  openDevdayDialog() {
    // https://github.com/angular/material2/issues/5268
    // TODO: work-around for expression change on dialog factory
    setTimeout(() => {
      this.dialog.open(DevdayTemplateEndDialogComponent, {width: '100%', height: '100%'})
          .afterClosed()
          .subscribe();
    });
  }

}
