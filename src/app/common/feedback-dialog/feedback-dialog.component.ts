import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

class DialogData {
}

@Component({
             selector: 'app-feedback-dialog',
             templateUrl: './feedback-dialog.component.html',
             styleUrls: ['./feedback-dialog.component.scss']
           })
export class FeedbackDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FeedbackDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
