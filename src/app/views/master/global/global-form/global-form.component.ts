import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-global-form',
    templateUrl: 'global-form.component.html',
    styleUrls: ['global-form.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})

export class GlobalFormComponent implements OnInit {
    @Input() data: any;
    @Output() formValueChange = new EventEmitter<any>();

    form: FormGroup;

    constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.initializeForm();
        this.form.valueChanges.subscribe(value => {
            this.formValueChange.emit(value);
        });
     }

    initializeForm() {
        this.form =  this.formBuilder.group({
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
}