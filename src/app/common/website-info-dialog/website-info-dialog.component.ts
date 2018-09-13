import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

class DialogData {
}

@Component({
             selector: 'app-website-info-dialog',
             templateUrl: './website-info-dialog.component.html',
             styleUrls: ['./website-info-dialog.component.scss']
           })
export class WebsiteInfoDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<WebsiteInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
