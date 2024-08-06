import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewEncapsulation,
} from '@angular/core';
import {
    FormGroup,
    FormControl,
    FormArray,
    FormBuilder,
} from '@angular/forms';
import { RegexPipe } from '../../../../../services/input.pipe'; 
import { FilterService } from '../../../../../services/filter.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
    selector: 'app-menu-group-limit-form',
    templateUrl: 'menu-group-limit-form.component.html',
    styleUrls: ['menu-group-limit-form.component.scss']
})

export class MenuFroupLimitFormComponent implements OnInit {
    @Input() data: any;
    @Output() formValueChange = new EventEmitter<any>();

    form: FormGroup;

    outletCodeList: any;

    regionCodeList: any;

    orderTypeCodeList: any;

    menuGroupCodeList: any;

    disabled: boolean = false;

    onDestroy$ = new Subject<void>();

    constructor(
        private formBuilder: FormBuilder,
        private regexPipe: RegexPipe,
        private filterService: FilterService
    ) {}

    ngOnInit() {
        this.initializeForm();
        this.form.valueChanges.subscribe((value) => {
            this.formValueChange.emit(value);
        });
        this.getMenuGroupCode();
        this.getRegionCode();
        this.getOutletCode();
        this.getOrderType();
    }

    initializeForm() {
        this.form = this.formBuilder.group({
            regionCode: [this.data?.data?.regionCode || ''],
            outletCode: [this.data?.data?.outletCode || ''],
            menuGroupCode: [this.data?.data?.menuGroupCode || ''],
            orderType: [this.data?.data?.orderType || ''],
        });

        const outletCodeValue = this.form.get('outletCode')?.value;
        const regionCodeValue = this.form.get('regionCode')?.value;
        const menuGroupCodeValue = this.form.get('menuGroupCode')?.value;
       
        if (outletCodeValue) {
            this.form.controls['outletCode'].disable();
            this.disabled = true;
        } 

        if (regionCodeValue) {
            this.form.controls['regionCode'].disable();
            this.disabled = true;
        }
    }

    clearForm() {
        this.form.reset();
    }

    onChangeInput(input: any, type: string) {
        const result: boolean = this.regexPipe.transform(input, type);
        if (!result) input.preventDefault();
        return result;
    }

    getRegionCode() {
        this.filterService.getFilterListRegion().pipe(
            takeUntil(this.onDestroy$),
            tap((response) => {
                this.regionCodeList = response.data;
            })
        ).subscribe();
    }

    getOutletCode() {
        this.filterService.getFilterOutlet().pipe(
            takeUntil(this.onDestroy$),
            tap((response) => {
                this.outletCodeList = response.data;
            })
        ).subscribe();
    }

    getMenuGroupCode() {
        this.filterService.getFilterMenuGroupCode().pipe(
            takeUntil(this.onDestroy$),
            tap((response) => {
                this.menuGroupCodeList = response.data;
            })
        ).subscribe();
    }

    getOrderType() {
        this.filterService.getFilterOrderType().pipe(
            takeUntil(this.onDestroy$),
            tap((response) => {
                this.orderTypeCodeList = response.data;
            })
        ).subscribe();
    }
}