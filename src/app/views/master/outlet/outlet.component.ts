import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
    selector: 'app-outlet',
    templateUrl: 'outlet.component.html',
    styleUrls: ['outlet.component.scss']
})

export class OutletComponent implements OnInit {
    headerTitle: string = '';
    menuTable: string = '';
    apiUrl: string = '';
    setOrderBy: any;

    renderColumns: any;
    onDestroy$ = new Subject<void>();

    constructor(
        private service: AppService
    ) { }

    ngOnInit() { 
      this.headerTitle = 'Master Data Outlet';
      this.menuTable = 'outlet';
      this.apiUrl = '/outlet/dt';
      this.renderColumn();
    }

    renderColumn() {
        this.renderColumns =  [
            { data: 'dtIndex', title: '#', orderable: false, searchable: false },
            { data: 'regionCode', title: 'REGION CODE', orderable: true, searchable: true },
            // { data: 'regionName', title: 'REGION NAME', orderable: true, searchable: true },
            { data: 'areaCode', title: 'AREA CODE', orderable: true, searchable: true },
            // { data: 'areaName', title: 'AREA NAME', orderable: true, searchable: true },
            { data: 'outletCode', title: 'OUTLET CODE', orderable: true, searchable: true },
            { data: 'outletName', title: 'OUTLET NAME', orderable: true, searchable: true },
            { data: 'initialOutlet', title: 'INITIAL', orderable: true, searchable: true },
            { data: 'type', title: 'TYPE', orderable: true, searchable: true },
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
      this.setOrderBy =  [[1, 'asc']];
    }
}