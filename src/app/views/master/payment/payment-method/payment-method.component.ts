import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../../../services/filter.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
    selector: 'app-payment-method',
    templateUrl: 'payment-method.component.html',
    styleUrls: ['payment-method.component.scss']
})

export class PaymentMethodComponent implements OnInit {
    tabMenus: any;
    headerTitle: string = '';
    menuTable: string = '';
    apiUrl: string = '';
    renderColumns: {};
    setOrderBy: any;
    paymentMethodCodeList: any;
    paymentTypeCodeList: any;
    onDestroy$ = new Subject<void>();

    constructor(
        private filterService: FilterService
    ) { }

    ngOnInit() {
        this.headerTitle = 'Master Data Payment Method';
        this.menuTable = 'payment-method';
        this.apiUrl = '/payment-method/dt';
        this.renderColumn();
        this.orderBy();
        this.getTabMenus();
        this.getPaymentMethodCode();
        this.getPaymentTypeCode();
    }

    renderColumn() {
        this.renderColumns =  [
            { data: 'dtIndex', title: '#', orderable: false, searchable: false },
            { data: 'regionCode', title: 'REGION CODE', orderable: true, searchable: true },
            { data: 'outletCode', title: 'OUTLET CODE', orderable: true, searchable: true },
            { data: 'paymentMethodCode', title: 'PAYMENT METHOD CODE', orderable: true, searchable: true },
            { data: 'paymentTypeCode', title: 'PAYMENT TYPE CODE', orderable: true, searchable: true },
            { data: 'seq', title: 'SEQ', orderable: true, searchable: true },
            { data: 'colorCode', title: 'COLOR CODE', orderable: true, searchable: true },
            {
              data: 'status',
              title: 'STATUS',
              orderable: true,
              searchable: true,
              render: (data: any, type: any, row: any) => {
                const statusText = data === 'A' ? 'Active' :  (data === 'I' ? 'Inactive' : '-');
                return `
                  <div class="badge-status badge-status__${data}">
                      ${statusText}
                  </div>
                `;
              },
            },
            { data: 'minSales', title: 'MIN SALES', orderable: true, searchable: true },
            { data: 'moreThanPaymentAllow', title: 'MORE THAN PAYMENT ALLOW', orderable: true, searchable: true },
            { data: 'documentEntry', title: 'DOCUMENT ENTRY', orderable: true, searchable: true },
            { data: 'changeAllow', title: 'CHANGE ALLOW', orderable: true, searchable: true },
            { data: 'maxChange', title: 'MAX CHANGE', orderable: true, searchable: true },
            { data: 'action', title: 'ACTION', orderable: true, searchable: true },
            {
                data: 'status',
                title: 'ACTIONS',
                orderable: false,
                searchable: false,
                render: (data: any, type: any, row: any) => {
                    ` <div class="dropdown-action">
                        <button class="dropbtn">Action <i class="fa fa-caret-down" aria-hidden="true"></i></button>
                        <div class="dropdown-content">
                        <button class="action-button action-edit"><i class="fa fa-pencil"></i> Edit</button>
                        <button class="action-button"><i class="fa fa-power-off"></i> Inactive</button>
                        </div>
                    </div>
                    `
                    let actionBtn =  `
                        <div class="dropdown-action">
                            <button class="dropbtn">Action <i class="fa fa-caret-down" aria-hidden="true"></i></button>
                            <div class="dropdown-content">
                            <button class="action-button action-edit"><i class="fa fa-pencil"></i> Edit</button>
                        `;
                    if (data == 'I') {
                        actionBtn += `
                            <button class="action-button action-activate"><i class="fa fa-power-off"></i> Activate</button>
                            </div>
                        </div>`
                    } else {
                        actionBtn += `
                            <button class="action-button action-inactive"><i class="fa fa-power-off"></i> Inactive</button>
                            </div>
                        </div>`
                    }
                    
                    return actionBtn;
                },
            }
        ]
    }

    getPaymentMethodCode() {
        this.filterService.getFilterPaymentMethodCode().pipe(
            takeUntil(this.onDestroy$),
            tap((response) => {
                this.paymentMethodCodeList = response.data;
            })
        ).subscribe();
    }

    getPaymentTypeCode() {
        this.filterService.getFilterPaymentTypeCode().pipe(
            takeUntil(this.onDestroy$),
            tap((response) => {
                this.paymentTypeCodeList = response.data;
            })
        ).subscribe()
    }

    orderBy() {
        this.setOrderBy =  [
            [6, 'asc'],
            [1, 'asc']
        ];
    }

    getTabMenus() {
        this.tabMenus = [
            {
                tabMenuName: 'Master Payment',
                route: '/master/payment/master-payment'
            },
            {
                tabMenuName: 'Master Payment Method',
                route: '/master/payment/payment-method'
            },
            {
                tabMenuName: 'Master Payment Method Limit',
                route: '/master/payment/payment-method-limit'
            }
        ]
    }

}