import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FeedbackDialogComponent } from 'src/app/common/feedback-dialog/feedback-dialog.component';

@Component({
             selector: 'app-website-info',
             templateUrl: './website-info.component.html',
             styleUrls: ['./website-info.component.scss']
           })
export class WebsiteInfoComponent implements OnInit {

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  feedbackDialog() {
    // https://github.com/angular/material2/issues/5268
    // TODO: work-around for expression change on dialog factory
    setTimeout(() => {
      this.dialog.open(FeedbackDialogComponent,
                       {
                         data: {}
                       })
          .afterClosed()
          .subscribe();
    });
  }

}
