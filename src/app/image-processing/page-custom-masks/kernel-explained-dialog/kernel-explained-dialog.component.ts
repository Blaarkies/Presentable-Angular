import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
             selector: 'app-kernel-explained-dialog',
             templateUrl: './kernel-explained-dialog.component.html',
             styleUrls: ['./kernel-explained-dialog.component.scss']
           })
export class KernelExplainedDialogComponent {

  constructor(public dialogRef: MatDialogRef<KernelExplainedDialogComponent>) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
