import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'master-modifier-price',
    templateUrl: 'modifier-price.component.html',
    styleUrl: 'modifier-price.component.scss'
})

export class MasterModifierPriceComponent implements OnInit {
    headerTitle: string = 'Master Data Modifier Price';
    apiUrl: string = '/modifier-price/dt';
    apiInsertUrl: string = '/modifier-price/insert';
    apiUpdateUrl: string = '/modifier-price/update';
    menuTable: string = 'modifier-price';
    condList: any;
    renderColumns: any;
    setOrderBy: any;
    onDestroy$ = new Subject<void>();

    constructor() { }

    ngOnInit() {
        this.renderColumn();
        this.getFilter();
        this.orderBy();
    }

    orderBy() {
        this.setOrderBy = [
            [1, 'asc']
        ];
    }

    getFilter() {}

    renderColumn() {
        this.renderColumns = [
            {
                data: 'dtIndex',
                title: '#',
                orderable: false,
                searchable: false,
            },
            {
                data: 'modifierGroupCode',
                title: 'GROUP CODE',
                orderable: true,
                searchable: true,
            },
            {
                data: 'modifierItemCode',
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
                orderable: true,
                searchable: true,
            },
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
                  `;
                    let actionBtn = `
                    <div class="dropdown-action">
                      <button class="dropbtn">Action <i class="fa fa-caret-down" aria-hidden="true"></i></button>
                      <div class="dropdown-content">
                        <button class="action-button action-edit"><i class="fa fa-pencil"></i> Edit</button>
                  `;
                    return actionBtn;
                },
            },
        ]
    }
}