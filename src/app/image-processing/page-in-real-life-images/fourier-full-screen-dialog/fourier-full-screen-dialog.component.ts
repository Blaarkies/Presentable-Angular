import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
             selector: 'app-fourier-full-screen-dialog',
             templateUrl: './fourier-full-screen-dialog.component.html',
             styleUrls: ['./fourier-full-screen-dialog.component.scss']
           })
export class FourierFullScreenDialogComponent {

  constructor(public dialogRef: MatDialogRef<FourierFullScreenDialogComponent>) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
