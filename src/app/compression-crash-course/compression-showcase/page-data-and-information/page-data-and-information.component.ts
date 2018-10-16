import { Component, OnInit } from '@angular/core';
import { JsonAsset } from 'src/app/common/interface';
import { CompressionShowcaseService } from 'src/app/compression-crash-course/compression-showcase/compression-showcase.service';
import { MatDialog } from '@angular/material';
import { DevdayTemplateDialogComponent } from 'src/app/compression-crash-course/compression-showcase/page-data-and-information/devday-template-dialog/devday-template-dialog.component';

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

  openDevdayDialog() {
    // https://github.com/angular/material2/issues/5268
    // TODO: work-around for expression change on dialog factory
    setTimeout(() => {
      this.dialog.open(DevdayTemplateDialogComponent, {width: '100%', height: '100%'})
          .afterClosed()
          .subscribe();
    });
  }

}
