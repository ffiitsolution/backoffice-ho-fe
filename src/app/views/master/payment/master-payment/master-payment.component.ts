import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-master-payment',
    templateUrl: 'master-payment.component.html',
    styleUrls: ['master-payment.component.scss']
})

export class MasterPaymentComponent implements OnInit {
    tabMenus: any;
    headerTitle: string = '';
    menuTable: string = '';
    apiUrl: string = '';
    renderColumns: {};
    setOrderBy: any;

    constructor() { }

    ngOnInit() {
        this.headerTitle = 'Master Data Payment';
        this.menuTable = 'master-payment';
        this.apiUrl = '/payment/dt';
        this.renderColumn();
        this.orderBy();
        this.getTabMenus();
    }

    renderColumn() {
        this.renderColumns =  [
            { data: 'dtIndex', title: '#', orderable: false, searchable: false },
            { data: 'paymentId', title: 'ID', orderable: true, searchable: true },
            { data: 'paymentName', title: 'NAME', orderable: true, searchable: true },
            { data: 'paymentAmount', title: 'AMOUNT', orderable: true, searchable: true },
            { data: 'paymentType', title: 'TYPE', orderable: true, searchable: true },
            { data: 'platinumId', title: 'PLATINUM ID',orderable: true,searchable: true },
            { data: 'paymentStatus', title: 'STATUS', orderable: true, searchable: true,
                render: (data: any, type: any, row: any) => {
                const statusText = data === 'I' ? 'Inactive' : 'Active';
                return `
                    <div class="badge-status badge-status__${data}">
                        ${statusText}
                    </div>
                `;
                },
            },
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