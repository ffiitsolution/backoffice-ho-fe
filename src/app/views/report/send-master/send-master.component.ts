import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
    selector: 'app-send-master',
    templateUrl: 'send-master.component.html',
    styleUrls: ['send-master.component.scss']
})

export class SendMasterComponent implements OnInit {
    headerTitle: string = '';
    apiUrl: string = '';
    apiInsertUrl: string = '';
    apiUpdateUrl: string = '';
    condList: any;
    menuTable: string = '';
    renderColumns: any;
    setOrderBy: any;
    onDestroy$ = new Subject<void>();

    constructor(
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit() {
      this.headerTitle = 'Send Master';
      this.apiUrl = '/sync-update/dt';
      this.apiInsertUrl = '/master/sync-update/insert';
      this.apiUpdateUrl = '/master/sync-update/update';
      this.menuTable = 'sync-update';
      this.renderColumn();
      this.getFilter();
      this.orderBy();
    }

    getFilter() {

    }

    // :syncId, :description, :totalUpd, :remark, :status, :dateCrt, :userCrt, :timeCrt, :dateUpd, :userUpd, :timeUpd, :versions
    renderColumn() {
    this.renderColumns = [
        { data: 'dtIndex', title: '#', orderable: false, searchable: false },
        { data: 'syncId', title: 'SYNC ID', orderable: true, searchable: true },
        { data: 'dateCrt', title: 'DATE CRT', orderable: true, searchable: true },
        { data: 'userCrt', title: 'USER CRT', orderable: true, searchable: true },
        { data: 'description', title: 'DESCRIPTION', orderable: true, searchable: true },
        { data: 'totalUpd', title: 'TOTAL UPD', orderable: true, searchable: true },
        { data: 'remark', title: 'REMARK', orderable: true, searchable: true },
        {
          data: 'status',
          title: 'STATUS',
          orderable: true,
          searchable: true,
          render: (data: any, type: any, row: any) => {
            const statusText = data === 'A' ? 'Active' :  (data === 'I' ? 'Inactive' : data);
            return `
              <div class="badge-status badge-status__${data}">
                  ${statusText}
              </div>
            `;
          },
        },
        { data: 'userUpd', title: 'USER UPD', orderable: true, searchable: true },
        { data: 'dateUpd', title: 'DATE UPD', orderable: true, searchable: true },
        { data: 'timeUpd', title: 'TIME UPD', orderable: true, searchable: true },
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
      this.setOrderBy =  [[5, 'asc'],[1, 'asc']];
    }
}
