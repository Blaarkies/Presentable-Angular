import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

class DialogData {
}

@Component({
             selector: 'app-tutorial-dialog',
             templateUrl: './tutorial-dialog.component.html',
             styleUrls: ['./tutorial-dialog.component.scss']
           })
export class TutorialDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TutorialDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
