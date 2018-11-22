import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      'Title': string,
      'Body': string,
      'OkBtnCaption': string,
      'CancelBtnCaption': string,
      'CancelBtnVisible': Boolean} ) {}

  ngOnInit() {
    /* this.data = {
      Title: 'Title',
      Body: 'Body',
      OkBtnCaption: 'OK',
      CancelBtnCaption: 'Cancel',
      CancelBtnVisible : true
    }; */
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
