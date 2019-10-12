import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

class DialogData {
  title: string;
  styleClass: string;
}

@Component({
             selector: 'app-fullscreen-uno-image-dialog',
             templateUrl: './fullscreen-uno-image-dialog.component.html',
             styleUrls: ['./fullscreen-uno-image-dialog.component.scss']
           })
export class FullscreenUnoImageDialogComponent {


  constructor(public dialogRef: MatDialogRef<FullscreenUnoImageDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
