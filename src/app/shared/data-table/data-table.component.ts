import {
  Component,
  AfterViewInit,
  ViewChild,
  OnInit,
  Input,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { DataTableDirective } from 'angular-datatables';
import { catchError, Subject, takeUntil, tap, throwError } from 'rxjs';
import { Page } from './data-table.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AppService } from '../../services/app.service';

import { DialogConfirmationComponent } from '../dialog-confirmation/dialog-confirmation.component';
import { DialogCrudDataComponent } from '../dialog-crud-data/dialog-crud-data.component';
import { ErrorHelper } from '../../helper/error.helper';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MESSAGES } from '../../helper/message.helper';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit, AfterViewInit {
  @Input() headerTitle: string = '';
  @Input() tabMenus: any;
  @Input() condList: any;
    @Input() orderTypeList: any;
  @Input() type: any;
  @Input() regionCodes: any;
  @Input() areaCodes: any;
  @Input() apiUrl: string = '';
  @Input() apiInserteUrl: string = '';
  @Input() apiUpdateUrl: string = '';
  @Input() menuTable: any;
  @Input() columns: any;
  @Input() orderBy: any;

  @ViewChild(DataTableDirective, { static: false })

  // Data Table Configuration
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  selectedRowData: any;
  dtColumns: any = [];
  page = new Page();

  // Form Configuration
  formStatus: string;
  createUpdateForm: FormGroup;

  // Parameter Global
  selectedCondition: any;
  selectedConditionValue: string | null = null;

  // Parameter Outlet
  selectedOutletType: any = '';
  selectedRegion: any = '';
  selectedArea: any = '';
  selectFilter: any;
  isFilterVisible: boolean = false;

  // Success Notification
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  // Parameter Status
  selectedStatus: any;
  selectedStatusValue: string | null = null;
  statusList = [
    {
      name: 'Active',
      code: 'A',
    },
    {
      name: 'Inactive',
      code: 'I',
    },
  ];

  // Parameter Other
  selectedItemCode: any;
  selectedCdSupplier: any;
    selectedOrderType: any;
  activeTabRoute: string = '';

  // Parameter tanggal / datepicker
  selectedDate: any; // single
  selectedDateRange = new FormGroup({
    start: new FormControl<Date | null>(new Date()),
    end: new FormControl<Date | null>(new Date()),
  });

  onDestroy$ = new Subject<void>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private service: AppService,
    private dialog: MatDialog,
    private errorHelper: ErrorHelper,
    private snackBar: MatSnackBar,
    private router: Router,
    private datePipe: DatePipe,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getDataTable();
    this.activeTabRoute = this.router.url;

    if (this.menuTable === 'sync-update') {
      this.selectedDateRange = new FormGroup({
        start: new FormControl<Date | null>(this.getDateDaysAgo(14)),
        end: new FormControl<Date | null>(new Date()),
      });
      // this.selectedDateRange.get('start')?.valueChanges.subscribe((value) => {
      //   console.log('Start date changed:', value);
      // });
      this.selectedDateRange.get('end')?.valueChanges.subscribe((value) => {
        // console.log('End date changed:', value);
        if(value !== null){
          this.onFilterChange();
        }
      });
    }
  }

  ngAfterViewInit() {
    this.dtTrigger.next(null);
  }

  changeTab(router: any) {
    this.router.navigate([router]);
  }

  openFilter() {
    this.isFilterVisible = !this.isFilterVisible;
  }

  getDataTable() {
    const mapData = (resp: any) => {
      return resp.data.map((item: any, index: number) => {
        const { rn, ...rest } = item;
        return {
          ...rest,
          dtIndex: this.page.start + index + 1,
        };
      });
    };

    this.dtOptions = {
      processing: true,
      serverSide: true,
      autoWidth: true,
      info: true,
      drawCallback: () => {
        this.selectedRowData = undefined;
      },
      ajax: (dataTablesParameters: any, callback) => {
        this.page.start = dataTablesParameters.start;
        this.page.length = dataTablesParameters.length;
		if (this.menuTable == 'global') {
			dataTablesParameters['status'] = this.selectedStatus?.code ?? '';
			dataTablesParameters['cond'] = this.selectedCondition?.cond ?? '';
		} else if (this.menuTable == 'outlet') {
			dataTablesParameters['type'] = this.selectedOutletType?.code ?? '';
			dataTablesParameters['regionCode'] = this.selectedRegion?.code ?? '';
			dataTablesParameters['areaCode'] = this.selectedArea?.code ?? '';
			dataTablesParameters['status'] = this.selectedStatus?.code ?? '';
		} else if (this.menuTable == 'supplier') {
			dataTablesParameters['status'] = this.selectedStatus?.code ?? '';
		} else if (this.menuTable == 'item-supplier') {
			dataTablesParameters['status'] = this.selectedStatus?.code ?? '';
			dataTablesParameters['itemCode'] = this.selectedItemCode?.code ?? '';
			dataTablesParameters['cdSupplier'] =
			this.selectedCdSupplier?.code ?? '';
		} else if (this.menuTable == 'mpcs-header') {
			dataTablesParameters['status'] = this.selectedStatus?.code ?? '';
		} else if (this.menuTable == 'mpcs-detail') {
			dataTablesParameters['status'] = this.selectedStatus?.code ?? '';
		} else if (this.menuTable == 'modifier-item') {
			dataTablesParameters['status'] = this.selectedStatus?.code ?? '';
		} else if (this.menuTable == 'menu-item') {
			dataTablesParameters['status'] = this.selectedStatus?.code ?? '';
		} else if (this.menuTable == 'menu-set') {
			dataTablesParameters['status'] = this.selectedStatus?.code ?? '';
		} else if (this.menuTable == 'master-payment') {
			dataTablesParameters['status'] = this.selectedStatus?.code ?? '';
		} else if (this.menuTable == 'payment-method') {
			dataTablesParameters['status'] = this.selectedStatus?.code ?? '';
		} else if (this.menuTable == 'recipe-header') {
			dataTablesParameters['status'] = this.selectedStatus?.code ?? '';
		} else if (this.menuTable == 'payment-method-limit') {
			dataTablesParameters['regionCode'] = this.selectedRegion?.code ?? '';
			dataTablesParameters['orderType'] = this.selectedOrderType?.code ?? '';
        } else if (this.menuTable == 'sync-update') {
          dataTablesParameters['status'] = this.selectedStatus?.code ?? '';
          dataTablesParameters['startDate'] = this.selectedDateRange?.value
            .start
            ? this.datePipe.transform(
                this.selectedDateRange?.value.start,
                'dd MMM yyyy'
              )
            : '';
          dataTablesParameters['endDate'] = this.selectedDateRange?.value.end
            ? this.datePipe.transform(
                this.selectedDateRange?.value.end,
                'dd MMM yyyy'
              )
            : '';
        }

        this.service
          .getListDataTable(this.apiUrl, dataTablesParameters)
          .pipe(
            catchError((error: any) => {
              this.errorHelper.handleError(error);
              return throwError(() => error);
            })
          )
          .subscribe((resp: any) => {
            const mappedData = mapData(resp);
            this.page.recordsTotal = resp.recordsTotal;
            this.page.recordsFiltered = resp.recordsFiltered;
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: mappedData,
            });
          });
      },
      columns: this.columns,
      searchDelay: 1500,
      order: this.orderBy,
      rowCallback: (row: Node, data: any, index: number) => {
        $('.action-edit', row).on('click', () =>
          this.dialogEditDataTable(data)
        );
        $('.action-inactive', row).on('click', () =>
          this.dialogConfirmation(data, 'inactive')
        );
        $('.action-activate', row).on('click', () =>
          this.dialogConfirmation(data, 'activate')
        );
        return row;
      },
    };

    this.dtColumns = this.dtOptions.columns;
  }

  private getDateDaysAgo(days: number): Date {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
  }

  onFilterChange(): void {
    this.dtElement.dtInstance.then((dtInstance) => {
      dtInstance.draw();
    });
  }

  insertDataTable(data: any) {
    this.service.dataLoading(true);
    this.service
      .upsertDataTable(this.apiInserteUrl, data)
      .pipe(
        takeUntil(this.onDestroy$),
        tap((response: any) => {
          // Success Case
          if (response.success) {
            this.service.dataLoading(false);
            this.successNotification(MESSAGES.SUCCESS_MESSAGE_CREATED_EN);
            this.onFilterChange();
          }
        }),
        // Error Case
        catchError((error: any) => {
          this.service.dataLoading(false);
          this.errorHelper.handleError(error);
          return throwError(() => error);
        })
      )
      .subscribe();
  }

  updateDatatable(data: any) {
    this.service.dataLoading(true);
    this.service
      .upsertDataTable(this.apiUpdateUrl, data)
      .pipe(
        takeUntil(this.onDestroy$),
        tap((response) => {
          // Success Case
          if (response.success) {
            this.service.dataLoading(false);
            this.successNotification(MESSAGES.SUCCESS_MESSAGE_UPDATE_EN);
            this.onFilterChange();
          }
        }),
        // Error Case
        catchError((error: any) => {
          this.service.dataLoading(false);
          this.errorHelper.handleError(error);
          return throwError(() => error);
        })
      )
      .subscribe();
  }

  dialogConfirmation(data: any, status: string) {
    const confirmationData = {
      data: data,
      status: status,
    };

    const confirmationDialog = this.dialog.open(DialogConfirmationComponent, {
      data: confirmationData,
      disableClose: true,
    });

    confirmationDialog.afterClosed().subscribe((result) => {
      if (result == true) {
        if (status == 'inactive') {
          data.status = 'I';
        } else if (status == 'activate') {
          data.status = 'A';
        }

        this.updateDatatable(data);
      } else {
        confirmationDialog.close();
      }
    });
  }

  dialogAddNewData() {
    const data = {
      crudStatus: 'add',
      menuTable: this.menuTable,
    };

    const dialogNewData = this.dialog.open(DialogCrudDataComponent, {
      data: data,
      width: '800px',
      panelClass: 'create-data-dialog',
      disableClose: true,
    });

    dialogNewData.afterClosed().subscribe((response) => {
      if (response) {
        this.insertDataTable(response);
      }
    });
  }

  dialogEditDataTable(dataColumn: any) {
    const data = {
      crudStatus: 'edit',
      menuTable: this.menuTable,
      data: dataColumn,
    };

    const dialogEditData = this.dialog.open(DialogCrudDataComponent, {
      data: data,
      width: '800px',
      panelClass: 'create-data-dialog',
      disableClose: true,
    });

    dialogEditData.afterClosed().subscribe((response) => {
      if (response) {
        this.updateDatatable(response);
      }
    });
  }

  dtPageChange(event: any) {
    this.selectedRowData = undefined;
    $.fn['dataTable'].ext.search.pop();
  }

  successNotification(successMessage: any) {
    this.snackBar.open(successMessage, 'Close', {
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['success-snackbar'],
    });
  }
}
