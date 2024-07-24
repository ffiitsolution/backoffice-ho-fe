import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MESSAGES } from '../../helper/message.helper';

@Component({
    selector: 'app-dialog-confirmation',
    templateUrl: 'dialog-confirmation.component.html',
    styleUrls: ['dialog-confirmation.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})

export class DialogConfirmationComponent implements OnInit {
    messageConfirmation: string = '';

    constructor(
        public dialogRef: MatDialogRef<DialogConfirmationComponent>, 
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit() {
        this.getMessage();
    }

    getMessage() {
        if (this.data.status == 'inactive') {
            this.messageConfirmation = MESSAGES.INACTIVE_CONFRIMATION_MESSAGE_EN;
        } else if (this.data.status == 'activate') {
            this.messageConfirmation = MESSAGES.ACTIVATE_CONFRIMATION_MESSAGE_EN;
        }
    }

    onConfirm(confirm: boolean) {
        this.dialogRef.close(confirm);
    }
}