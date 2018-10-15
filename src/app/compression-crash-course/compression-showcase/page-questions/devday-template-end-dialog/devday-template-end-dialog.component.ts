import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
             selector: 'app-devday-template-end-dialog',
             templateUrl: './devday-template-end-dialog.component.html',
             styleUrls: ['./devday-template-end-dialog.component.scss']
           })
export class DevdayTemplateEndDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DevdayTemplateEndDialogComponent>) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
