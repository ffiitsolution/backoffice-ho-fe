import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegexPipe } from '../../../../services/input.pipe';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-price-form',
    templateUrl: 'price-form.component.html',
    encapsulation: ViewEncapsulation.Emulated,
})
export class MasterPriceFormComponent implements OnInit {
    @Input() data: any;
    @Output() formValueChange = new EventEmitter<any>();

    form: FormGroup;
    onDestroy$ = new Subject<void>();
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
            menuItemCode: [this.data?.data?.menuItemCode || ''],
            priceTypeCode: [this.data?.data?.priceTypeCode || ''],
            price: [this.data?.data?.price || ''],
        });
        this.IS_EDIT_MODE =
            this.form.get('menuItemCode')?.value ||
            this.form.get('priceTypeCode')?.value;
    }

    onChangeInput(input: any, type: string) {
        const result: boolean = this.regexPipe.transform(input, type);
        if (!result) input.preventDefault();
        return result;
    }
}
