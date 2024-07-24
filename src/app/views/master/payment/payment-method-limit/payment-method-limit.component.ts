import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-payment-method-limit',
    templateUrl: 'payment-method-limit.component.html',
    styleUrls: ['payment-method-limit.component.scss']
})

export class PaymentMethodLimitComponent implements OnInit {
    tabMenus: any;
    headerTitle: string = '';
    menuTable: string = '';
    apiUrl: string = '';
    renderColumns: {};
    setOrderBy: any;

    constructor() { }

    ngOnInit() { 
        this.headerTitle = 'Master Data Payment Method Limit';
        this.menuTable = 'payment-method-limit';
        this.apiUrl = '/payment-method-limit/dt';
        this.renderColumn();
        this.orderBy();
        this.getTabMenus();
    }
    
    renderColumn() {
        this.renderColumns =  [
            { data: 'dtIndex', title: '#', orderable: false, searchable: false },
            { data: 'regionCode', title: 'REGION CODE', orderable: true, searchable: true },
            { data: 'outletCode', title: 'OUTLET CODE', orderable: true, searchable: true },
            { data: 'paymentMethodCode', title: 'PAYMENT METHOD CODE', orderable: true, searchable: true },
            { data: 'orderType', title: 'Order Type', orderable: true, searchable: true },
            {
                data: 'dtIndex',
                title: 'ACTIONS',
                orderable: false,
                searchable: false,
                render: (data: any, type: any, row: any) => {
                    ` <div class="dropdown-action">
                        <button class="dropbtn">Action <i class="fa fa-caret-down" aria-hidden="true"></i></button>
                        <div class="dropdown-content">
                        <button class="action-button action-edit"><i class="fa fa-pencil"></i> Edit</button>
                        </div>
                    </div>
                    `
                    let actionBtn =  `
                        <div class="dropdown-action">
                            <button class="dropbtn">Action <i class="fa fa-caret-down" aria-hidden="true"></i></button>
                            <div class="dropdown-content">
                                <button class="action-button action-edit"><i class="fa fa-pencil"></i> Edit</button>
                            </div>
                        </div>
                    `;
                    return actionBtn;
                },
            }
        ]
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