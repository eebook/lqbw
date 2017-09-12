import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';


@Component({
  templateUrl: './confirm-box.component.html',
  styleUrls: ['./confirm-box.component.scss'],
  providers: [
    // MdDialogRef
  ]
})
export class ConfirmBoxComponent {
  public title: string;
  public message: string;

  constructor(
    public dialogRef: MdDialogRef<ConfirmBoxComponent>,
  ) { }

}
