import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
             selector: 'app-seeing-wifi-dialog',
             templateUrl: './seeing-wifi-dialog.component.html',
             styleUrls: ['./seeing-wifi-dialog.component.scss']
           })
export class SeeingWifiDialogComponent {

  constructor(public dialogRef: MatDialogRef<SeeingWifiDialogComponent>) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
