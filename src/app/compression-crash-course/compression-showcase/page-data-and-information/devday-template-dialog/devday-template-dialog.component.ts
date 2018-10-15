import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
             selector: 'app-devday-template-dialog',
             templateUrl: './devday-template-dialog.component.html',
             styleUrls: ['./devday-template-dialog.component.scss']
           })
export class DevdayTemplateDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DevdayTemplateDialogComponent>) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
