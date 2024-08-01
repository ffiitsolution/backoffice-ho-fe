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
    selector: 'app-recipe-product-form',
    templateUrl: 'recipe-product-form.component.html',
    styleUrl: '../../recipe.component.scss',
    encapsulation: ViewEncapsulation.Emulated,
})
export class RecipeProductFormComponent implements OnInit {
    @Input() data: any;
    @Output() formValueChange = new EventEmitter<any>();

    form: FormGroup;
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
            rcode: [this.data?.data?.recipeCode || ''],
            productCode: [this.data?.data?.productCode || ''],
            qtyPurchase: [this.data?.data?.qtyPurchase || ''],
            uomPurchase: [this.data?.data?.uomPurchase || ''],
            qtyStock: [this.data?.data?.qtyStock || ''],
            uomStock: [this.data?.data?.uomStock || ''],
            remark: [this.data?.data?.productRemark || ''],
        });
    }

    onChangeInput(input: any, type: string) {
        const result: boolean = this.regexPipe.transform(input, type);
        if (!result) input.preventDefault();
        return result;
    }
}
