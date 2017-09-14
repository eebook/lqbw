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
  // https://medium.com/@tarik.nzl/making-use-of-dialogs-in-material-2-mddialog-7533d27df41
  public title: string;
  public message: string;

  constructor(
    public dialogRef: MdDialogRef<ConfirmBoxComponent>,
  ) { }

}
