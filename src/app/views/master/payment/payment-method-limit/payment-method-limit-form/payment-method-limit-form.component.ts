import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegexPipe } from '../../../../../services/input.pipe';
import { FilterService } from '../../../../../services/filter.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
    selector: 'app-payment-method-limit-form',
    templateUrl: 'payment-method-limit-form.component.html',
    styleUrls: ['payment-method-limit-form.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})

export class PaymentMethodLimitFormComponent implements OnInit {
    @Input() data: any;
    @Output() formValueChange = new EventEmitter<any>();

    form: FormGroup;

    paymentMethodList: any;
    orderTypeList: any;

    selectPaymentMethodCode: any;
    selectOrderTypeCode: any;

    onDestroy$ = new Subject<void>();

    constructor(
        private formBuilder: FormBuilder,
        private regexPipe: RegexPipe,
        private filterService: FilterService
    ) { }

    ngOnInit() {
        this.initializeForm();
        this.getPaymentMethodCode();
        this.getOrderType();
        this.form.valueChanges.subscribe(value => {
            this.formValueChange.emit(value);
        });
     }

    initializeForm() {
        this.form =  this.formBuilder.group({
            regionCode: [this.data?.data?.regionCode || ''],
            outletCode: [this.data?.data?.outletCode || ''],
            paymentMethodCode: [this.data?.data?.paymentMethodCode || ''],
            orderType: [this.data?.data?.orderType || '']
        });
    }

    getPaymentMethodCode() {
        this.filterService.getFilterPaymentMethodCode().pipe(
            takeUntil(this.onDestroy$),
            tap((response) => {
                this.paymentMethodList = response.data;
            })
        ).subscribe();
    }

    getOrderType() {
        this.filterService.getFilterOrderType().pipe(
            takeUntil(this.onDestroy$),
            tap((response) => {
                this.orderTypeList = response.data;
            })
        ).subscribe();
    }

    clearForm() {
        this.form.reset(); 
    }

    onChangeInput(input: any, type: string) {
        const result: boolean = this.regexPipe.transform(input, type);
        if(!result) input.preventDefault();
        return result;
    }
}