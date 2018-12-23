import { Observable } from 'rxjs';
import { ConfirmBoxComponent } from '../components/confirm-box/confirm-box.component';
// import { } from '../components'
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class ModalService {

    constructor(private dialog: MatDialog) { }

    public confirm(title: string, message: string): Observable<boolean> {

        let dialogRef: MatDialogRef<ConfirmBoxComponent>;

        dialogRef = this.dialog.open(ConfirmBoxComponent);
        dialogRef.componentInstance.dialogRef = dialogRef;
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;

        return dialogRef.afterClosed();
    }
}
