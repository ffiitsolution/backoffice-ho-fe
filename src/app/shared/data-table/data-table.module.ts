import { NgModule } from '@angular/core';
import { DataTableComponent } from './data-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DatePipe } from '@angular/common';

@NgModule({
    declarations: [
        // DataTableComponent
    ],
    exports: [
        MatPaginatorModule,
        // MatSortModule,
        // MatTableModule,
        MatProgressSpinnerModule,
        MatButtonToggleModule,
    ],
  })
  export class DataTableModule {}