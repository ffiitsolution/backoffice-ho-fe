import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
    selector: 'app-menu-item',
    templateUrl: 'menu-item.component.html',
    styleUrls: ['menu-item.component.scss']
})

export class MenuItemComponent implements OnInit {
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
      this.headerTitle = 'Master Data Menu Item';
      this.apiUrl = '/menu-item/dt'
      this.apiUpdateUrl = '/master/menu-item/update'
      this.menuTable = 'menu-item';
      this.renderColumn();
      this.getFilter();
      this.orderBy();
    }

    getFilter() {

    }

    // :regionCode, :outletCode, :menuItemCode, :menuGroupCode, :plu, :eiFlag, :taFlag, :catFlag, :brdFlag, :seq, :colorCode, :managerApproval, :discountable, :taxable, :menuSet, :modifierGroup1Code, :modifierGroup1MinQty, :modifierGroup1MaxQty, :modifierGroup2Code, :modifierGroup2MinQty, :modifierGroup2MaxQty, :modifierGroup3Code, :modifierGroup3MinQty, :modifierGroup3MaxQty, :modifierGroup4Code, :modifierGroup4MinQty, :modifierGroup4MaxQty, :modifierGroup5Code, :modifierGroup5MinQty, :modifierGroup5MaxQty, :modifierGroup6Code, :modifierGroup6MinQty, :modifierGroup6MaxQty, :modifierGroup7Code, :modifierGroup7MinQty, :modifierGroup7MaxQty, :callGroupCode, :autoShowModifier, :status, :userUpd, :dateUpd, :timeUpd
    renderColumn() {
    this.renderColumns = [
        { data: 'dtIndex', title: '#', orderable: false, searchable: false },
        { data: 'regionCode', title: 'REGION CODE', orderable: true, searchable: true },
        { data: 'outletCode', title: 'OUTLET CODE', orderable: true, searchable: true },
        { data: 'menuItemCode', title: 'MENU ITEM CODE', orderable: true, searchable: true },
        { data: 'menuGroupCode', title: 'MENU GROUP CODE', orderable: true, searchable: true },
        { data: 'plu', title: 'PLU', orderable: true, searchable: true },
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
      this.setOrderBy =  [[1, 'asc'],[6, 'asc']];
    }
}
