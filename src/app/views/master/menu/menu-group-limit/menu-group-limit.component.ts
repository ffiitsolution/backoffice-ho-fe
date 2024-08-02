import { Component, OnInit } from '@angular/core';
import { tabMenu } from '../../../../helper/tab-menu.helper';

@Component({
    selector: 'app-menu-group-limit',
    templateUrl: 'menu-group-limit.component.html',
    styleUrls: ['menu-group-limit.component.scss']
})

export class MenuGroupLimitComponent implements OnInit {
    apiUrl = '/menu-group-limit/dt';
    menuTable: string = '';
    headerTitle: string = '';
    renderColumns: {};
    setOrderBy: any;
    tabMenus: { tabMenuName: string; route: string }[] = tabMenu;

    constructor() { }

    ngOnInit() { 
        this.headerTitle = 'Master Data Menu Group Limit';
        this.menuTable = 'menu-group-limit';
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
                data: 'orderType',
                title: 'ORDER TYPE',
                orderable: true,
                searchable: true,
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
            [1, 'asc'],
            [2, 'asc'],
            [3, 'asc'],
        ];
    }
}