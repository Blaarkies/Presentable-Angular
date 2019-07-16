import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

class DialogData {
  title: string;
  styleClass: string;
}

@Component({
             selector: 'app-fullscreen-dual-image-dialog',
             templateUrl: './fullscreen-dual-image-dialog.component.html',
             styleUrls: ['./fullscreen-dual-image-dialog.component.scss']
           })
export class FullscreenDualImageDialogComponent {


  constructor(public dialogRef: MatDialogRef<FullscreenDualImageDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
