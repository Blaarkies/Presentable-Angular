import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

class DialogData {
  isPresentationMode: boolean;
}

@Component({
             selector: 'app-settings-dialog',
             templateUrl: './settings-dialog.component.html',
             styleUrls: ['./settings-dialog.component.scss']
           })
export class SettingsDialogComponent {

  isPresentationMode: boolean;

  constructor(public dialogRef: MatDialogRef<SettingsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.isPresentationMode = data.isPresentationMode || false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  closeOnSave(): any {
    this.dialogRef
        .close({isPresentationMode: this.isPresentationMode});
  }
}
