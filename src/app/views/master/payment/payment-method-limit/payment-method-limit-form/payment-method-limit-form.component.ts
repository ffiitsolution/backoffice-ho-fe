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
import { FilterService } from '../../../../../services/filter.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
    selector: 'app-payment-method-limit-form',
    templateUrl: 'payment-method-limit-form.component.html',
    styleUrls: ['payment-method-limit-form.component.scss'],
    encapsulation: ViewEncapsulation.Emulated,
})
export class PaymentMethodLimitFormComponent implements OnInit {
    @Input() data: any;
    @Output() formValueChange = new EventEmitter<any>();

    form: FormGroup;

    paymentMethodList: any;
    regionCodeList: any;
    outletCodeList: any;
    orderTypeList: any;

    disabled: boolean = false;

    selectPaymentMethodCode: any = null;
    selectOrderTypeCode: any = null;

    onDestroy$ = new Subject<void>();

    constructor(
        private formBuilder: FormBuilder,
        private regexPipe: RegexPipe,
        private filterService: FilterService,
    ) {}

    ngOnInit() {
        this.initializeForm();
        this.getOutletCode();
        this.getRegionCode();
        this.getPaymentMethodCode();
        this.getOrderType();
        this.form.valueChanges.subscribe((value) => {
            this.formValueChange.emit(value);
        });
    }

    initializeForm() {
        this.form = this.formBuilder.group({
            regionCode: [this.data?.data?.regionCode || ''],
            outletCode: [this.data?.data?.outletCode || ''],
            paymentMethodCode: [this.data?.data?.paymentMethodCode || null],
            orderType: [this.data?.data?.orderType || null],
        });

        const outletCodeValue = this.form.get('outletCode')?.value;

        if (outletCodeValue) {
            this.form.controls['outletCode'].disable();
            this.disabled = true;
        } 
    }

    getPaymentMethodCode() {
        this.filterService
            .getFilterPaymentMethodCode()
            .pipe(
                takeUntil(this.onDestroy$),
                tap((response) => {
                    this.paymentMethodList = response.data;
                }),
            )
            .subscribe();
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

    getOrderType() {
        this.filterService
            .getFilterOrderType()
            .pipe(
                takeUntil(this.onDestroy$),
                tap((response) => {
                    this.orderTypeList = response.data;
                }),
            )
            .subscribe();
    }

    clearForm() {
        this.form.reset();
    }

    onChangeInput(input: any, type: string) {
        const result: boolean = this.regexPipe.transform(input, type);
        if (!result) input.preventDefault();
        return result;
    }
}
