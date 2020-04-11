import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
             selector: 'app-outro-dialog',
             templateUrl: './outro-dialog.component.html',
             styleUrls: ['./outro-dialog.component.scss']
           })
export class OutroDialogComponent {

  constructor(public dialogRef: MatDialogRef<OutroDialogComponent>) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
