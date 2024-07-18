import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { GlobalService } from './global.service';

@Component({
    selector: 'app-global',
    templateUrl: 'global.component.html',
    styleUrls: ['global.component.scss']
})

export class GlobalComponent implements OnInit {
    headerTitle: string = '';
    apiUrl: string = '';
    apiUpdateUrl: string = '';
    condList: any;
    menuTable: string = '';
    renderColumns: any;
    setOrderBy: any;
    onDestroy$ = new Subject<void>();

    constructor(
        private service: GlobalService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit() { 
      this.headerTitle = 'Master Data Global';
      this.apiUrl = '/global/dt'
      this.apiUpdateUrl = '/master/global/update'
      this.menuTable = 'global';
      this.renderColumn();
      this.getFilter();
      this.orderBy();
    }

    getFilter() {
      this.service.getListGlobalCondition().pipe(
        takeUntil(this.onDestroy$),
        tap((response) => {
          this.condList = response.data;
        })
      ).subscribe()
    }

    renderColumn() {
    this.renderColumns = [
        { data: 'dtIndex', title: '#', orderable: false, searchable: false },
        { data: 'cond', title: 'CONDITION', orderable: true, searchable: true },
        { data: 'code', title: 'CODE', orderable: true, searchable: true },
        { data: 'description', title: 'DESCRIPTION', orderable: true, searchable: true },
        { data: 'value', title: 'VALUE', orderable: true, searchable: true },
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

    orderBy() {
      this.setOrderBy =  [[1, 'asc']];
    }
}