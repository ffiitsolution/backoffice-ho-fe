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
    selector: 'app-recipe-header-form',
    templateUrl: 'recipe-header-form.component.html',
    styleUrls: ['../../recipe.component.scss'],
    encapsulation: ViewEncapsulation.Emulated,
})
export class RecipeHeaderFormComponent implements OnInit {
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
            rremark: [this.data?.data?.recipeRemark || ''],
            mpcsGroup: [this.data?.data?.mpcsGroup || ''],
            status: [this.data?.data?.status || ''],
        });
    }

    onChangeInput(input: any, type: string) {
        const result: boolean = this.regexPipe.transform(input, type);
        if (!result) input.preventDefault();
        return result;
    }
}
