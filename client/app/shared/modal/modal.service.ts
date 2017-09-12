import { Observable } from 'rxjs/Rx';
import { ConfirmBoxComponent } from '../components/confirm-box/confirm-box.component';
// import { } from '../components'
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class ModalService {

    constructor(private dialog: MdDialog) { }

    public confirm(title: string, message: string): Observable<boolean> {

        let dialogRef: MdDialogRef<ConfirmBoxComponent>;

        dialogRef = this.dialog.open(ConfirmBoxComponent);
        dialogRef.componentInstance.dialogRef = dialogRef;
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;

        return dialogRef.afterClosed();
    }
}
