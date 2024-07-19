import { Component, AfterViewInit, ViewChild, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { DataTableDirective } from 'angular-datatables';
import { Subject, takeUntil, tap } from 'rxjs';
import { Page } from './data-table.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from '../../services/app.service';

import { ACTION } from '../../helper/action.helper';
import { FORM_STATUS } from '../../helper/form.helper';
import { DialogConfirmationComponent } from '../dialog-confirmation/dialog-confirmation.component';
import { DialogCrudDataComponent } from '../dialog-crud-data/dialog-crud-data.component';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, AfterViewInit {
    @Input() headerTitle: string = '';
    @Input() condList: any;
    @Input() apiUrl: string = '';
    @Input() apiInserteUrl: string = '';
    @Input() apiUpdateUrl: string = '';
    @Input() menuTable: any;
    @Input() columns: any;
    @Input() orderBy: any;

    @ViewChild(DataTableDirective, {static: false})

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

    // Parameter Status
    selectedStatus: any;
    selectedStatusValue: string | null = null;
    statusList = [
      {
        name: 'Active',
        code: 'A'
      },
      {
        name: 'Inactive',
        code: 'I'
      }
    ];

    // Parameter Other
    selectedItemCode: any;
    selectedCdSupplier: any;

    onDestroy$ = new Subject<void>();

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private formBuilder: FormBuilder,
        private service: AppService,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.getDataTable();
        // this.initTable()
    }

    ngAfterViewInit() {
        this.dtTrigger.next(null);
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
                dtIndex: this.page.start + index + 1
              };
            });
        };

        const handleButtonClick = (action: string, data: any) => {
            this.selectedRowData = data;
            let { cond, code, description, value, status } = data;
            switch (action) {
              case ACTION.EDIT:
                this.formStatus = FORM_STATUS.UPDATE;
                break;
              case ACTION.INACTIVE:
                this.formStatus = FORM_STATUS.INACTIVE;
                status = 'I';
                break;
              case ACTION.ACTIVATE:
                status = 'A';
                this.formStatus = FORM_STATUS.ACTIVATE;
                break;
            }
            this.createUpdateForm.patchValue({ cond, code, description, value, status });
            const openModalButton = document.getElementById("openModalButton");
            if (openModalButton instanceof HTMLButtonElement) {
              openModalButton.click();
            }
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
                dataTablesParameters['type'] = this.selectedOutletType;
                dataTablesParameters['regionCode'] = this.selectedRegion;
                dataTablesParameters['areaCode'] = this.selectedArea;
                dataTablesParameters['status'] = this.selectedStatus?.code ?? '';
              } else if (this.menuTable == 'supplier') {
                dataTablesParameters['status'] = this.selectedStatus?.code ?? '';
              } else if (this.menuTable == 'item-supplier') {
                dataTablesParameters['status'] = this.selectedStatus?.code ?? '';
                dataTablesParameters['itemCode'] = this.selectedItemCode?.code ?? '';
                dataTablesParameters['cdSupplier'] = this.selectedCdSupplier?.code ?? '';
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
              }

              this.service.getListDataTable(this.apiUrl ,dataTablesParameters).subscribe((resp: any) => {
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
              $('.action-edit', row).on('click', () => this.dialogEditDataTable(data));
              $('.action-inactive', row).on('click', () => this.dialogConfirmation(data, 'inactive'));
              $('.action-activate', row).on('click', () => this.dialogConfirmation(data, 'activate'));
              return row;
            },
          };

          this.dtColumns = this.dtOptions.columns;
    }

    onFilterChange(): void {
      this.dtElement.dtInstance.then(dtInstance => {
        dtInstance.draw();
      });
    }

    insertDataTable(data: any) {
      this.service.upsertDataTable(this.apiInserteUrl, data).pipe(
        takeUntil(this.onDestroy$),
        tap((response) => {
          console.log(response)
        })
      ).subscribe();
    }

    updateDatatable(data: any) {
      this.service.upsertDataTable(this.apiUpdateUrl, data).pipe(
        takeUntil(this.onDestroy$),
        tap((response) => {
          console.log(response)
        })
      ).subscribe();
    }

    dialogConfirmation(data: any, status: string) {
      const confirmationData = {
        data: data,
        status: status
      }

      const confirmationDialog = this.dialog.open(DialogConfirmationComponent, {
        data: confirmationData,
        disableClose: true
      });

      confirmationDialog.afterClosed().subscribe((result) => {
        if(result) {
          this.updateDatatable(data);
        } else {
          confirmationDialog.close()
        }
      })
    }

    dialogAddNewData() {
      const data = {
        crudStatus: 'add',
        menuTable: this.menuTable
      }

      const dialogNewData = this.dialog.open(DialogCrudDataComponent, {
        data: data,
        width: '800px',
        panelClass: 'create-data-dialog',
        disableClose: true
      });

      dialogNewData.afterClosed().subscribe((response) => {
        this.insertDataTable(response)
      });
    }

    dialogEditDataTable(dataColumn: any) {
      const data = {
        crudStatus: 'edit',
        menuTable: this.menuTable,
        data: dataColumn
      }

      const dialogEditData = this.dialog.open(DialogCrudDataComponent, {
        data: data,
        width: '800px',
        panelClass: 'create-data-dialog',
        disableClose: true
      });

      dialogEditData.afterClosed();
    }

    dtPageChange(event: any) {
        this.selectedRowData = undefined;
        $.fn['dataTable'].ext.search.pop();
    }

}
