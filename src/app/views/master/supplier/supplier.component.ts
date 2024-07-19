import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
    selector: 'app-supplier',
    templateUrl: 'supplier.component.html',
    styleUrls: ['supplier.component.scss']
})

export class SupplierComponent implements OnInit {
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
      this.headerTitle = 'Master Data Supplier';
      this.apiUrl = '/supplier/dt'
      this.apiUpdateUrl = '/master/supplier/update'
      this.menuTable = 'supplier';
      this.renderColumn();
      this.getFilter();
      this.orderBy();
    }

    getFilter() {

    }

    // :cdSupplier, :supplierName, :address1, :address2, :city, :zipCode, :phone, :fax, :homepage, :cpName, :cpTitle, :cpPhone, :cpPhoneExt, :cpMobile, :cpEmail, :flagCanvasing, :status, :userUpd, :dateUpd, :timeUpd
    renderColumn() {
    this.renderColumns = [
        { data: 'dtIndex', title: '#', orderable: false, searchable: false },
        { data: 'cdSupplier', title: 'REGION CODE', orderable: true, searchable: true },
        { data: 'supplierName', title: 'OUTLET CODE', orderable: true, searchable: true },
        { data: 'city', title: 'MENU ITEM CODE', orderable: true, searchable: true },
        {
          data: 'flagCanvasing',
          title: 'CANVASING',
          orderable: true,
          searchable: true,
          render: (data: any, type: any, row: any) => {
            const statusText = data === 'Y' ? 'Yes' :  (data === 'N' ? 'No' : '-');
            data = data === 'Y' ? 'A' :  (data === 'N' ? 'I' : '-');
            return `
              <div class="badge-status badge-status__${data}">
                  ${statusText}
              </div>
            `;
          },
        },
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
      this.setOrderBy =  [[5, 'asc'],[1, 'asc']];
    }
}
