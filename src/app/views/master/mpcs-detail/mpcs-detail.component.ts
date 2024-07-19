import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
    selector: 'app-mpcs-detail',
    templateUrl: 'mpcs-detail.component.html',
    styleUrls: ['mpcs-detail.component.scss']
})

export class MpcsDetailComponent implements OnInit {
    headerTitle: string = '';
    apiUrl: string = '';
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
      this.headerTitle = 'Master Data MPCS Detail';
      this.apiUrl = '/mpcs-detail/dt'
      this.apiUpdateUrl = '/master/mpcs-detail/update'
      this.menuTable = 'mpcs-detail';
      this.renderColumn();
      this.getFilter();
      this.orderBy();
    }

    getFilter() {

    }

    // :outletCode, :fryerType, :fryerTypeSeq, :fryerTypeCnt, :fryerTypeReset, :status, :userUpd, :dateUpd, :timeUpd, :fryerTypeSeqCnt
    renderColumn() {
    this.renderColumns = [
        { data: 'dtIndex', title: '#', orderable: false, searchable: false },
        { data: 'outletCode', title: 'OUTLET CODE', orderable: true, searchable: true },
        { data: 'fryerType', title: 'FRYER TYPE', orderable: true, searchable: true },
        { data: 'fryerTypeCnt', title: 'FRYER TYPE COUNT', orderable: true, searchable: true },
        { data: 'fryerTypeSeq', title: 'FRYER TYPE SEQ', orderable: true, searchable: true },
        { data: 'fryerTypeSeqCnt', title: 'FRYER TYPE SEQ COUNT', orderable: true, searchable: true },
        { data: 'fryerTypeReset', title: 'FRYER TYPE', orderable: true, searchable: true },
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
        { data: 'userUpd', title: 'USER UPD', orderable: true, searchable: true },
        { data: 'dateUpd', title: 'DATE UPD', orderable: true, searchable: true },
        { data: 'timeUpd', title: 'TIME UPD', orderable: true, searchable: true },
        {
          data: 'orderType',
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
      this.setOrderBy =  [[7, 'asc'],[1, 'asc']];
    }
}
