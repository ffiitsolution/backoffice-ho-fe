import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../../services/filter.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
    selector: 'app-price',
    templateUrl: 'price.component.html',
    styleUrl: 'price.component.scss'
})

export class MasterPriceComponent implements OnInit {
    apiUrl : string = '/price/dt';
    apiInsertUrl = '/master/price/insert';
    apiUpdateUrl = '/master/price/update';
    headerTitle : string = 'Master Price';
    menuTable: string = 'price';
    renderColumns = {};
    setOrderBy : any;
    priceTypeCodeList: any;
    onDestroy$ = new Subject<void>();

    constructor(
        private filterService: FilterService
    ) { }

    ngOnInit() {
        this.renderColumn();
        this.orderBy();
        this.getPaymentTypeCode();
    }

    renderColumn() {
        this.renderColumns = [
            {
                data: 'dtIndex',
                title: '#',
                orderable: false,
                searchable: false,
            },
            {
                data: 'menuItemCode',
                title: 'ITEM CODE',
                orderable: true,
                searchable: true,
            },
            {
                data: 'priceTypeCode',
                title: 'PRICE TYPE CODE',
                orderable: true,
                searchable: true,
            },
            {
                data: 'price',
                title: 'PRICE',
                orderable: false,
                searchable: true,
            },
            {
                data: 'menuItemCode',
                title: 'ACTIONS',
                orderable: false,
                searchable: false,
                render: (data: any, type: any, row: any) => {
                    `<div class="dropdown-action">
                        <button class="dropbtn">Action <i class="fa fa-caret-down" aria-hidden="true"></i></button>
                        <div class="dropdown-content">
                            <button class="action-button action-edit"><i class="fa fa-pencil"></i> Edit</button>
                        </div>
                    </div>
                    `;

                    let actionBtn = `
                        <div class="dropdown-action">
                            <button class="dropbtn">Action <i class="fa fa-caret-down" aria-hidden="true"></i></button>
                            <div class="dropdown-content">
                                <button class="action-button action-edit"><i class="fa fa-pencil"></i> Edit</button>
                            </div>
                        </div>
                    `;

                    return actionBtn;
                },
            },
        ];
    }

    getPaymentTypeCode() {
        this.filterService
            .getFilterPriceTypeCode()
            .pipe(
                takeUntil(this.onDestroy$),
                tap((response) => {
                    this.priceTypeCodeList = response.data;
                }),
            )
            .subscribe();
    }

    orderBy() {
        this.setOrderBy = [
            [1, 'asc'],
        ];
    }
}