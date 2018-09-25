import { Component, OnInit } from '@angular/core';
import { JsonAsset } from 'src/app/common/interface';
import { CompressionShowcaseService } from 'src/app/compression-crash-course/compression-showcase/compression-showcase.service';
import { TutorialDialogComponent } from 'src/app/common/tutorial-dialog/tutorial-dialog.component';
import { switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material';

@Component({
             selector: 'app-page-data-and-information',
             templateUrl: './page-data-and-information.component.html'
           })
export class PageDataAndInformationComponent implements OnInit {

  data: JsonAsset;
  charLimit: number;

  constructor(private dataService: CompressionShowcaseService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.dataService.data.subscribe(data => this.data = data);
    this.charLimit = this.dataService.charLimit;

    // https://github.com/angular/material2/issues/5268
    // TODO: work-around for expression change on dialog factory
    setTimeout(() => this.testDialog());
  }

  testDialog() {
    // if (!this.isTutorialMode) {
      return;
    // }

    // this.dataService.data
    //     .pipe(switchMap(data => this.dialog.open(
    //       TutorialDialogComponent,
    //       {
    //         width: '50%',
    //         data: data.pageDataAndInformation
    //       })
    //                                 .afterClosed()
    //     ))
    //     .subscribe();
  }

}
