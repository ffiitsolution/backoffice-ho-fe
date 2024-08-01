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
    selector: 'app-recipe-detail-form',
    templateUrl: 'recipe-detail-form.component.html',
    styleUrl: '../../recipe.component.scss',
    encapsulation: ViewEncapsulation.Emulated,
})
export class RecipeDetailFormComponent implements OnInit {
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
            itemCode: [this.data?.data?.itemCode || ''],
            qtyPurchase: [this.data?.data?.qtyPurchase || ''],
            uomPurchase: [this.data?.data?.uomPurchase || ''],
            qtyStock: [this.data?.data?.qtyStock || ''],
            uomStock: [this.data?.data?.uomStock || ''],
            remark: [this.data?.data?.remark || ''],
        });
    }

    onChangeInput(input: any, type: string) {
        const result: boolean = this.regexPipe.transform(input, type);
        if (!result) input.preventDefault();
        return result;
    }
}
