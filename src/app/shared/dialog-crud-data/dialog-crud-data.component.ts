import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-dialog-crud-data',
    templateUrl: 'dialog-crud-data.component.html',
    styleUrls: ['dialog-crud-data.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})

export class DialogCrudDataComponent implements OnInit {
    crudTitle: string = '';

    form: FormGroup;

    dataInput: any;

    constructor(
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<DialogCrudDataComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit() {
        this.getCrudTitle();
    }

    getCrudTitle() {
        if(this.data.crudStatus == 'add') {
            this.crudTitle = 'Create New Data';
        } else if (this.data.crudStatus == 'edit') {
            this.crudTitle = 'Edit Data'
        }
    }

    clearForm() {
        this.form.reset();
    }

    getFormValue(event: any) {
        this.dataInput = event;
    }

    submitForm() {
        this.dialogRef.close(this.dataInput);
    }
}
