import { Component } from '@angular/core';
import { WebsiteInfoDialogComponent } from 'src/app/common/website-info-dialog/website-info-dialog.component';
import { MatDialog } from '@angular/material';
import { DialogPosition } from '@angular/material/typings/dialog';

@Component({
             selector: 'app-page-questions',
             templateUrl: './page-questions.component.html',
             styleUrls: ['./page-questions.component.scss']
           })
export class PageQuestionsComponent {

  constructor(private dialog: MatDialog) {
  }

  websiteInfoDialog() {
    // https://github.com/angular/material2/issues/5268
    // TODO: work-around for expression change on dialog factory
    setTimeout(() => {
      this.dialog.open(WebsiteInfoDialogComponent,
                       {
                         position: <DialogPosition>{
                           top: '5%'
                         },
                         width: '50%',
                         data: {}
                       })
          .afterClosed()
          .subscribe();
    });
  }

}
