import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegexPipe } from '../../../../../services/input.pipe';

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
    IS_EDIT_MODE: boolean = false;
    constructor(
        private formBuilder: FormBuilder,
        private regexPipe: RegexPipe,
    ) {}

    ngOnInit() {
        this.initializeForm();
        this.form.valueChanges.subscribe((value) => {
            this.formValueChange.emit(value);
        });
    }

    initializeForm() {
        this.form = this.formBuilder.group({
            modifierGroupCode: [this.data?.data?.modifierGroupCode || ''],
            modifierItemCode: [this.data?.data?.modifierItemCode || ''],
            priceTypeCode: [this.data?.data?.priceTypeCode || ''],
            price: [this.data?.data?.price || 0],
        });
        this.IS_EDIT_MODE =
            this.form.get('modifierGroupCode')?.value ||
            this.form.get('modifierItemCode')?.value ||
            this.form.get('priceTypeCode')?.value;
    }

    onChangeInput(input: any, type: string) {
        const result: boolean = this.regexPipe.transform(input, type);
        if (!result) input.preventDefault();
        return result;
    }
}
