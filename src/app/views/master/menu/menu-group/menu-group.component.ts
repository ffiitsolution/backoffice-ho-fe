import { Component, OnInit } from '@angular/core';
import { tabMenu } from '../../../../helper/tab-menu.helper';

@Component({
    selector: 'app-menu-group',
    templateUrl: 'menu-group.component.html',
    styleUrls: ['menu-group.component.scss']
})

export class MenuGroupComponent implements OnInit {
    apiUrl = '/menu-group/dt'
    headerTitle: string = '';
    renderColumns: {};
    setOrderBy: any;
    tabMenus: { tabMenuName: string; route: string }[] = tabMenu;

    constructor() { }

    ngOnInit() { 
        this.headerTitle = 'Master Data Menu Group';
        this.renderColumn();
        this.orderBy();
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
                data: 'outletCode',
                title: 'OUTLET CODE',
                orderable: true,
                searchable: true,
            },
            {
                data: 'menuGroupCode',
                title: 'MENU GROUP CODE',
                orderable: true,
                searchable: true,
            },
            {
                data: 'seq',
                title: 'SEQ',
                orderable: true,
                searchable: true,
            },
            {
                data: 'colorCode',
                title: 'COLOR CODE',
                orderable: true,
                searchable: true,
            },
            {
                data: 'status',
                title: 'STATUS',
                orderable: true,
                searchable: true,
                render: (data: any, type: any, row: any) => {
                    const statusText =
                        data === 'A'
                            ? 'Active'
                            : data === 'I'
                              ? 'Inactive'
                              : '-';
                    return `
                        <div class="badge-status badge-status__${data}">
                            ${statusText}
                        </div>
                    `;
                },
            },
            {
                data: 'userUpd',
                title: 'USER UPD',
                orderable: true,
                searchable: true,
            },
            {
                data: 'dateUpd',
                title: 'DATE UPD',
                orderable: true,
                searchable: true,
            },
            {
                data: 'menuGroupCode',
                title: 'ACTIONS',
                orderable: false,
                searchable: false,
                render: (data: any, type: any, row: any) => {
                    `<div class="dropdown-action">
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
                            </div>
                        </div>
                    `;

                    return actionBtn;
                },
            },
        ];
    }

    orderBy() {
        this.setOrderBy = [
            [5, 'asc'],
            [1, 'asc'],
        ];
    }
}