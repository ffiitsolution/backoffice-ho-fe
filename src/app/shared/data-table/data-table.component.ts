import { Component, AfterViewInit, ViewChild, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { DataTableDirective } from 'angular-datatables';
import { Subject, takeUntil, tap } from 'rxjs';
import { Page } from './data-table.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from '../../services/app.service';

import { ACTION } from '../../helper/action.helper';
import { FORM_STATUS } from '../../helper/form.helper';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, AfterViewInit {
    @Input() headerTitle: string = '';
    @Input() urlService: any;
    @Input() columns: any;

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

    // Parameter
    selectedCondition: string | null = null;
    selectedStatus: string | null = null;
    onDestroy$ = new Subject<void>();

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    
    constructor(
        private formBuilder: FormBuilder,
        private service: AppService
    ) {}

    ngOnInit(): void {
        this.getDataTable();
        // this.initTable()
    }

    ngAfterViewInit() {
        this.dtTrigger.next(null);
    }

    onKeyUp(event: KeyboardEvent): void {
    const target = event.target as HTMLInputElement;
    this.applyFilter(target.value);
    }

    applyFilter(filterValue: string) {
      
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
              dataTablesParameters['status'] = this.selectedStatus ?? '';
              dataTablesParameters['cond'] = this.selectedCondition ?? '';
              this.service.listGlobal(dataTablesParameters).subscribe((resp: any) => {
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
            order: [[1, 'asc']],
            rowCallback: (row: Node, data: any, index: number) => {
              $('.action-edit', row).on('click', () => handleButtonClick(ACTION.EDIT, data));
              $('.action-inactive', row).on('click', () => handleButtonClick(ACTION.INACTIVE, data));
              $('.action-activate', row).on('click', () => handleButtonClick(ACTION.ACTIVATE, data));
              return row;
            },
          };
      
          this.dtColumns = this.dtOptions.columns;
    }    

    dtPageChange(event: any) {
        this.selectedRowData = undefined;
        $.fn['dataTable'].ext.search.pop();
    }
        
}