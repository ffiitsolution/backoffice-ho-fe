import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
    selector: 'app-modifier-item',
    templateUrl: 'modifier-item.component.html',
    styleUrls: ['modifier-item.component.scss']
})

export class ModifierItemComponent implements OnInit {
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
      this.headerTitle = 'Master Data Modifier Item';
      this.apiUrl = '/modifier-item/dt'
      this.apiInsertUrl = '/master/modifier-item/insert';
      this.apiUpdateUrl = '/master/modifier-item/update';
      this.menuTable = 'modifier-item';
      this.renderColumn();
      this.getFilter();
      this.orderBy();
    }

    getFilter() {

    }

    // :regionCode, :outletCode, :modifierGroupCode, :modifierItemCode, :seq, :colorCode, :status, :callGroupCode, :userUpd, :dateUpd, :timeUpd, :taxable
    renderColumn() {
    this.renderColumns = [
        { data: 'dtIndex', title: '#', orderable: false, searchable: false },
        { data: 'regionCode', title: 'REGION CODE', orderable: true, searchable: true },
        { data: 'outletCode', title: 'OUTLET CODE', orderable: true, searchable: true },
        { data: 'modifierGroupCode', title: 'MODIFIER GROUP CODE', orderable: true, searchable: true },
        { data: 'modifierItemCode', title: 'ITEM CODE', orderable: true, searchable: true },
        { data: 'seq', title: 'SEQ', orderable: true, searchable: true },
        { data: 'colorCode', title: 'COLOR CODE', orderable: true, searchable: true },
        { data: 'callGroupCode', title: 'CALL GROUP CODE', orderable: true, searchable: true },
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
      this.setOrderBy =  [[8, 'asc'],[1, 'asc']];
    }
}
