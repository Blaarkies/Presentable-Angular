import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogTutorialData } from 'src/app/common/tutorial-dialog/dialog-tutorial.data';

@Component({
             selector: 'app-tutorial-dialog',
             templateUrl: './tutorial-dialog.component.html',
             styleUrls: ['./tutorial-dialog.component.scss']
           })
export class TutorialDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TutorialDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogTutorialData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
