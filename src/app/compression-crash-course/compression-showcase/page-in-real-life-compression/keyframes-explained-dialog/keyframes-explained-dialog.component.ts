import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
             selector: 'app-keyframes-explained-dialog',
             templateUrl: './keyframes-explained-dialog.component.html',
             styleUrls: ['./keyframes-explained-dialog.component.scss']
           })
export class KeyframesExplainedDialogComponent {

  constructor(public dialogRef: MatDialogRef<KeyframesExplainedDialogComponent>) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
