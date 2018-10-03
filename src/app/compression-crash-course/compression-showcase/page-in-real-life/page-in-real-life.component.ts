import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { KeyframesExplainedDialogComponent } from 'src/app/compression-crash-course/compression-showcase/page-in-real-life/keyframes-explained-dialog/keyframes-explained-dialog.component';
import { JpegExplainedDialogComponent } from 'src/app/compression-crash-course/compression-showcase/page-in-real-life/jpeg-explained-dialog/jpeg-explained-dialog.component';

@Component({
             selector: 'app-page-in-real-life',
             templateUrl: './page-in-real-life.component.html',
             styleUrls: ['./page-in-real-life.component.scss']
           })
export class PageInRealLifeComponent implements OnInit {

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openJpegDialog() {
    // https://github.com/angular/material2/issues/5268
    // TODO: work-around for expression change on dialog factory
    setTimeout(() => {
      this.dialog.open(JpegExplainedDialogComponent, {width: '90%'})
          .afterClosed()
          .subscribe();
    });
  }

  openKeyframesDialog() {
// https://github.com/angular/material2/issues/5268
    // TODO: work-around for expression change on dialog factory
    setTimeout(() => {
      this.dialog.open(KeyframesExplainedDialogComponent, {width: '90%'})
          .afterClosed()
          .subscribe();
    });
  }
}
