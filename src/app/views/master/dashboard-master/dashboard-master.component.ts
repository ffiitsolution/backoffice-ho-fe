import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import moment from 'moment';
import { Subject, takeUntil, tap } from 'rxjs';
import { UtilService } from '../../../services/util.service';
import { AppService } from '../../../services/app.service';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-dashboard-master',
    templateUrl: 'dashboard-master.component.html',
    styleUrls: ['dashboard-master.component.scss'],
})
export class DashboardMasterComponent implements OnInit {
    onDestroy$ = new Subject<void>();

    constructor(
        private appSvc: AppService,
        private cdr: ChangeDetectorRef,
        private utilService: UtilService,
        private datePipe: DatePipe,
    ) {}
    selectedDateRange = new FormGroup({
        start: new FormControl<Date | null>(new Date()),
        end: new FormControl<Date | null>(new Date()),
    });
    startDate: any;
    endDate: any;
    today: any;
    indexToday: number;
    isLoadingTable: boolean = false;
    transformedData: any;

    ngOnInit(): void {
        this.startDate = moment().startOf('month').toDate();
        this.endDate = moment().toDate();
        this.selectedDateRange = new FormGroup({
            start: new FormControl<Date | null>(this.startDate),
            end: new FormControl<Date | null>(this.endDate),
        });
        this.today = moment().format('YYYY-MM-DD');
        this.selectedDateRange
            .get('start')
            ?.valueChanges.subscribe((value) => {
                if (value !== null) {
                    this.startDate = value;
                }
            });
        this.selectedDateRange
            .get('end')
            ?.valueChanges.subscribe((value) => {
                if (value !== null) {
                    this.endDate = value;
                    this.fetchChartData();
                }
            });
        this.fetchChartData();
    }

    fetchChartData(): void {
        let start = this.startDate;
        let end = this.endDate;
        const params = {
            startDate: this.datePipe.transform(start, 'yyyy-MM-dd'),
            endDate: this.datePipe.transform(end, 'yyyy-MM-dd'),
        };
        if (!this.isLoadingTable) {
            this.isLoadingTable = true;
            this.appSvc
                .upsertDataTable('/master/dashboard/main-table', params)
                .subscribe({
                    next: (response: any) => {
                        const dateRange = this.utilService.generateDateRange(
                            params.startDate ? params.startDate : '',
                            params.endDate ? params.endDate : '',
                        );
                        let t = this.transformData(
                            response?.data ?? [],
                            dateRange,
                        );
                        this.transformedData = t;
                    },
                    error: (error: any) => {
                        console.error('Error fetching chart data', error);
                    },
                    complete: () => {
                        this.isLoadingTable = false;
                    },
                });
        }
    }

    transformData(data: any, dateRange: string[]): any {
        this.indexToday = dateRange.indexOf(this.today);

        const stores = Array.from(
            new Set(data.map((item: any) => item.outletName)),
        ).map((name: any) => {
            return {
                name,
                code: data.find((item: any) => item.outletName === name)
                    .outletCode,
            };
        });

        const tableData = stores.map((store) => {
            const dateStatuses = dateRange.map((date) => {
                const statuses = data
                    .filter(
                        (item: any) =>
                            item.outletName === store.name &&
                            item.dateUpd === date,
                    )
                    .map((item: any) => item.status);

                if (statuses.length === 0) {
                    return '-';
                }

                const allSuccess = statuses.every(
                    (status: any) => status === 'A',
                );
                const allFailed = statuses.every(
                    (status: any) => status === 'I',
                );

                if (allSuccess) {
                    return 'A';
                } else if (allFailed) {
                    return 'I';
                } else {
                    return '-';
                }
            });

            return {
                name: store.name,
                code: store.code,
                statuses: dateStatuses,
            };
        });

        // console.log({ stores, dates: dateRange, tableData });

        return { stores, dates: dateRange, tableData };
    }

    formatDateWithDayMonth(dateString: string): string {
        return moment(dateString).format('DD');
    }
}
