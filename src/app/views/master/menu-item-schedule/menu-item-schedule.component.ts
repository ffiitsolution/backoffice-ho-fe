import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
    selector: 'app-menu-item-schedule',
    templateUrl: 'menu-item-schedule.component.html',
    styleUrls: ['menu-item-schedule.component.scss']
})

export class MenuItemScheduleComponent implements OnInit {
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
      this.headerTitle = 'Master Data Menu Item Schedule';
      this.apiUrl = '/menu-item-schedule/dt'
      this.apiUpdateUrl = '/master/menu-item-schedule/update'
      this.menuTable = 'menu-item-schedule';
      this.renderColumn();
      this.getFilter();
      this.orderBy();
    }

    getFilter() {

    }

    // :regionCode, :outletCode, :menuItemCode, :startDate, :endDate, :monday, :mondayHourStart, :mondayHourEnd,
    // :tuesday, :tuesdayHourStart, :tuesdayHourEnd, :wednesday, :wednesdayHourStart, :wednesdayHourEnd,
    // :thursday, :thursdayHourStart, :thursdayHourEnd, :friday, :fridayHourStart, :fridayHourEnd,
    // :saturday, :saturdayHourStart, :saturdayHourEnd, :sunday, :sundayHourStart, :sundayHourEnd,
    // :holiday, :holidayHourStart, :holidayHourEnd, :userUpd, :dateUpd, :timeUpd
    renderColumn() {
    this.renderColumns = [
        { data: 'dtIndex', title: '#', orderable: false, searchable: false },
        { data: 'regionCode', title: 'REGION CODE', orderable: true, searchable: true },
        { data: 'outletCode', title: 'OUTLET CODE', orderable: true, searchable: true },
        { data: 'menuItemCode', title: 'MENU ITEM CODE', orderable: true, searchable: true },
        { data: 'startDate', title: 'START DATE', orderable: true, searchable: true },
        { data: 'userUpd', title: 'USER UPD', orderable: true, searchable: true },
        { data: 'dateUpd', title: 'DATE UPD', orderable: true, searchable: true },
        { data: 'timeUpd', title: 'TIME UPD', orderable: true, searchable: true },
        {
          data: 'startDate',
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
            return actionBtn;
          },
        }
      ]
    }

    orderBy() {
      this.setOrderBy =  [[1, 'asc'],[2, 'asc'],[4, 'desc']];
    }
}
