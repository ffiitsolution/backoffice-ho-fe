import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegexPipe } from '../../../../services/input.pipe';

@Component({
    selector: 'app-modifier-price-form',
    templateUrl: 'modifier-price-form.component.html',
    styleUrl: '../modifier-price.component.scss',
    encapsulation: ViewEncapsulation.Emulated,
})

export class MasterModifierPriceFormComponent implements OnInit {
    @Input() data: any;
    @Output() formValueChange = new EventEmitter<any>();

    form: FormGroup;
    constructor(
        private formBuilder: FormBuilder,
        private regexPipe: RegexPipe,
    ) { }

    ngOnInit() { 
        this.initializeForm();
        this.form.valueChanges.subscribe((value) => {
            this.formValueChange.emit(value);
        });
    }

    initializeForm() {
        this.form = this.formBuilder.group({
            mgroupCode: [this.data?.data?.modifierGroupCode || ''],
            mitemCode: [this.data?.data?.modifierItemCode || ''],
            priceTypeCode: [this.data?.data?.priceTypeCode || ''],
            price: [this.data?.data?.value || 0],
        });
    }

    onChangeInput(input: any, type: string) {
        const result: boolean = this.regexPipe.transform(input, type);
        if (!result) input.preventDefault();
        return result;
    }
}