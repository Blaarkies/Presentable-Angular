import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

interface TutorialTab {
  paragraphs: string[];
}

interface DialogTutorialData {
  firstTab: TutorialTab,
  secondTab: TutorialTab,
  thirdTab: TutorialTab
}

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
