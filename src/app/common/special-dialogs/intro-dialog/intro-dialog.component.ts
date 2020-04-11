import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
             selector: 'app-intro-dialog',
             templateUrl: './intro-dialog.component.html',
             styleUrls: ['./intro-dialog.component.scss']
           })
export class IntroDialogComponent {

  constructor(public dialogRef: MatDialogRef<IntroDialogComponent>) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
