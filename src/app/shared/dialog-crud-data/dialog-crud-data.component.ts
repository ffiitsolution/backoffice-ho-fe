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

    form: FormGroup

    constructor(
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<DialogCrudDataComponent>, 
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit() { 
        this.getCrudTitle();
        this.initializeForm();
        console.log(this.data)
    }

    getCrudTitle() {
        if(this.data.crudStatus == 'add') {
            this.crudTitle = 'Create New Data';
        } else if (this.data.crudStatus == 'edit') {
            this.crudTitle = 'Edit Data'
        }
    }

    initializeForm() {
        if(this.data.menuTable === 'global') {
            this.form = this.globalForm();
        }
    }

    globalForm(): FormGroup {
        return this.formBuilder.group({
            cond: [this.data?.data?.cond || ''],
            code: [this.data?.data?.code || ''],
            description: [this.data?.data?.description || ''],
            value: [this.data?.data?.value || 0],
            status: [this.data?.data?.status || '']
        });
    }

    clearForm() {
        this.form.reset(); 
    }

    submitForm() {
        console.log(this.form.value);
        // Add logic to submit the form
    }
}